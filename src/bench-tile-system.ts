/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  createSystem,
  Hovered,
  Mesh,
  MeshStandardMaterial,
  Pressed,
  RayInteractable,
  ScreenSpace,
  Types,
  UIKitMLAsset,
  Vector3,
} from '@iwsdk/core';

interface TileState {
  materials: MeshStandardMaterial[];
  rest: Vector3;
  restScale: Vector3;
  forward: Vector3;
  emissive: number;
  label: string;
}

export class BenchTileSystem extends createSystem(
  {
    tiles: { required: [RayInteractable], excluded: [ScreenSpace] },
  },
  {
    maxEmissive: { type: Types.Float32, default: 1.4 },
    fadeSpeed: { type: Types.Float32, default: 8 },
    selectOffset: { type: Types.Float32, default: 0.035 },
  },
) {
  private tileStates = new Map<number, TileState>();
  private targetPosition = new Vector3();
  private targetScale = new Vector3();
  private interactionStatus?: {
    setProperties(properties: { color?: string; text?: string }): void;
  };
  private lastStatus = '';
  private lastSelection = '';
  private confirmationSeconds = 0;
  private wasPressed = false;

  init(): void {
    this.cleanupFuncs.push(
      this.queries.tiles.subscribe(
        'qualify',
        (entity) => {
          const object = entity.object3D;
          if (!object || !object.name.startsWith('bench-tile-')) {
            return;
          }

          const materials: MeshStandardMaterial[] = [];
          object.traverse((child) => {
            if (
              !(child instanceof Mesh) ||
              !['bench-tile-face', 'bench-tile-mark'].includes(child.name)
            ) {
              return;
            }
            const source = child.material;
            if (source instanceof MeshStandardMaterial) {
              const material = source.clone();
              child.material = material;
              materials.push(material);
            }
          });
          if (materials.length === 0) {
            return;
          }

          const label =
            typeof object.userData.tileLabel === 'string'
              ? object.userData.tileLabel
              : object.name;

          this.tileStates.set(entity.index, {
            materials,
            rest: object.position.clone(),
            restScale: object.scale.clone(),
            forward: new Vector3(0, 0, 1).applyQuaternion(object.quaternion),
            emissive: 0,
            label,
          });
        },
        true,
      ),
    );

    this.cleanupFuncs.push(
      this.queries.tiles.subscribe('disqualify', (entity) => {
        for (const material of this.tileStates.get(entity.index)?.materials ??
          []) {
          material.dispose();
        }
        this.tileStates.delete(entity.index);
      }),
    );

    const panel = this.world.getSceneObject<UIKitMLAsset>('status-panel');
    this.interactionStatus = panel?.getElementById('interaction-status') ?? undefined;

    this.cleanupFuncs.push(() => {
      for (const state of this.tileStates.values()) {
        for (const material of state.materials) {
          material.dispose();
        }
      }
      this.tileStates.clear();
    });
  }

  update(delta: number): void {
    const fade = Math.min(1, this.config.fadeSpeed.peek() * delta);
    const maxEmissive = this.config.maxEmissive.peek();
    const selectOffset = this.config.selectOffset.peek();

    const pinchStrength = Math.max(
      this.input.xr.visualAdapters.hand.left.getPinchStrength(),
      this.input.xr.visualAdapters.hand.right.getPinchStrength(),
    );

    let hovered = false;
    let pressed = false;
    let pressedLabel = '';

    for (const entity of this.queries.tiles.entities) {
      const state = this.tileStates.get(entity.index);
      const object = entity.object3D;
      if (!state || !object) {
        continue;
      }

      const isSelected = entity.hasComponent(Pressed);
      const isHovered = entity.hasComponent(Hovered);
      hovered ||= isHovered;
      pressed ||= isSelected;
      if (isSelected) {
        pressedLabel = state.label;
      }

      let target = 0;
      if (isSelected) {
        target = maxEmissive;
      } else if (isHovered) {
        target = maxEmissive * (0.35 + 0.65 * pinchStrength);
      }
      state.emissive += (target - state.emissive) * fade;
      for (const material of state.materials) {
        material.emissiveIntensity = 0.04 + state.emissive;
      }

      this.targetPosition
        .copy(state.forward)
        .multiplyScalar(isSelected ? selectOffset : 0)
        .add(state.rest);
      object.position.lerp(this.targetPosition, fade);
      this.targetScale
        .copy(state.restScale)
        .multiplyScalar(isSelected ? 0.96 : isHovered ? 1.035 : 1);
      object.scale.lerp(this.targetScale, fade);
    }

    if (pressed && pressedLabel) {
      this.lastSelection = pressedLabel;
    }
    if (!pressed && this.wasPressed && this.lastSelection) {
      this.confirmationSeconds = 1.5;
    }
    this.wasPressed = pressed;
    this.confirmationSeconds = Math.max(0, this.confirmationSeconds - delta);

    const nextStatus = pressed
      ? [`Selecting tile ${pressedLabel}`, '#9bc53d']
      : this.confirmationSeconds > 0 && this.lastSelection
        ? [`Last selection: tile ${this.lastSelection}`, '#9bc53d']
        : hovered
          ? ['Tile targeted - pinch to select', '#5bc0eb']
          : ['Ready - look at a tile (Gaze + Hands)', '#a7b0c0'];

    const statusKey = nextStatus.join(':');
    if (statusKey !== this.lastStatus) {
      this.interactionStatus?.setProperties({
        text: nextStatus[0],
        color: nextStatus[1],
      });
      this.lastStatus = statusKey;
    }
  }
}
