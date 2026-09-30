/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  AssetType,
  BoxGeometry,
  Color,
  CylinderGeometry,
  defineAssets,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  TorusGeometry,
} from '@iwsdk/core';

const publicAssetUrl = (filePath: string): string =>
  `${import.meta.env.BASE_URL}${filePath.replace(/^\/+/u, '')}`;

const TILE_LABELS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

const TILE_ACCENTS = [
  0xff5470, 0xfde74c, 0x9bc53d, 0x5bc0eb, 0xc3a8ff, 0xff9f1c, 0x74d8f1,
  0xff6b6b, 0xb8e986,
] as const;

const TILE_SURFACES = [
  0x3a1824, 0x3a3216, 0x1c351f, 0x173344, 0x2c2545, 0x3c2613, 0x1a2f35,
  0x351a1a, 0x24351a,
] as const;

const TILE_BODY = new BoxGeometry(0.26, 0.2, 0.022);
const TILE_FACE = new PlaneGeometry(0.236, 0.176);
const TILE_MARK = new TorusGeometry(0.022, 0.0035, 8, 32);

const benchTile = (index: number): Group => {
  const accent = new Color(TILE_ACCENTS[index % TILE_ACCENTS.length]);
  const tile = new Group();
  tile.name = `bench-tile-${index}`;
  tile.userData.tileLabel = TILE_LABELS[index];

  const body = new Mesh(
    TILE_BODY,
    new MeshStandardMaterial({
      color: new Color(0x10131b),
      metalness: 0.45,
      roughness: 0.32,
    }),
  );
  body.name = 'bench-tile-frame';

  const face = new Mesh(
    TILE_FACE,
    new MeshStandardMaterial({
      color: new Color(TILE_SURFACES[index % TILE_SURFACES.length]),
      emissive: accent,
      emissiveIntensity: 0.04,
      metalness: 0.08,
      roughness: 0.5,
    }),
  );
  face.name = 'bench-tile-face';
  face.position.z = 0.012;

  const mark = new Mesh(
    TILE_MARK,
    new MeshStandardMaterial({
      color: accent.clone().multiplyScalar(0.36),
      emissive: accent,
      emissiveIntensity: 0.04,
      metalness: 0.15,
      roughness: 0.48,
    }),
  );
  mark.name = 'bench-tile-mark';
  mark.position.set(0, 0.024, 0.017);

  tile.add(body, face, mark);
  return tile;
};

const benchStage = (): Group => {
  const stage = new Group();
  stage.name = 'bench-stage';

  const floor = new Mesh(
    new CylinderGeometry(0.72, 0.9, 0.06, 64),
    new MeshStandardMaterial({
      color: new Color(0x111722),
      emissive: new Color(0x07101f),
      emissiveIntensity: 0.45,
      metalness: 0.55,
      roughness: 0.35,
    }),
  );
  floor.name = 'bench-stage-floor';
  floor.position.set(0, -0.08, -0.35);

  const ring = new Mesh(
    new TorusGeometry(0.68, 0.007, 8, 72),
    new MeshBasicMaterial({
      color: new Color(0x5bc0eb),
      opacity: 0.28,
      transparent: true,
    }),
  );
  ring.name = 'bench-stage-ring';
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, -0.048, -0.35);

  stage.add(floor, ring);
  return stage;
};

/** Nominal glasses FOV corners at ~2 m (70° × 66°, upper bound). */
const fovCornerMarker = (name: string): Mesh => {
  const marker = new Mesh(
    new BoxGeometry(0.06, 0.06, 0.06),
    new MeshBasicMaterial({
      color: new Color(0xffc857),
      opacity: 0.85,
      transparent: true,
    }),
  );
  marker.name = name;
  return marker;
};

const fovEdgeMarkers = (): Group => {
  const group = new Group();
  group.name = 'fov-edge-markers';

  const horizontal = 1.35;
  const vertical = 1.2;
  const depth = -2;

  const corners: Array<[string, number, number]> = [
    ['fov-marker-tl', -horizontal, vertical],
    ['fov-marker-tr', horizontal, vertical],
    ['fov-marker-bl', -horizontal, -vertical],
    ['fov-marker-br', horizontal, -vertical],
  ];

  for (const [name, x, yOffset] of corners) {
    const marker = fovCornerMarker(name);
    marker.position.set(x, 1.35 + yOffset, depth);
    group.add(marker);
  }

  return group;
};

export default defineAssets({
  'bench-stage': benchStage(),
  'fov-edge-markers': fovEdgeMarkers(),
  'bench-tile-0': benchTile(0),
  'bench-tile-1': benchTile(1),
  'bench-tile-2': benchTile(2),
  'bench-tile-3': benchTile(3),
  'bench-tile-4': benchTile(4),
  'bench-tile-5': benchTile(5),
  'bench-tile-6': benchTile(6),
  'bench-tile-7': benchTile(7),
  'bench-tile-8': benchTile(8),
  'status-panel': {
    name: 'Status Panel',
    type: AssetType.UIKitML,
    url: publicAssetUrl('ui/welcome.uikitml'),
  },
});
