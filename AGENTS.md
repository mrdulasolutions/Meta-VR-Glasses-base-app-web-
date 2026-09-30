# AGENTS.md — Glasses Web Foundation

Read this before changing this repo. It is the fast path for agents building Meta VR Glasses **web** experiences on IWSDK.

## Purpose

- **Foundation:** glasses-oriented manifest defaults in [`iwsdk.config.json`](./iwsdk.config.json).
- **Bench:** nine `RayInteractable` tiles + FOV corner markers in [`public/scenes/main.iwsdk.scene.json`](./public/scenes/main.iwsdk.scene.json).
- **Behavior:** [`src/bench-tile-system.ts`](./src/bench-tile-system.ts) uses standard `Hovered` / `Pressed` tags (no gaze-specific components on targets).

## Glasses contract (keep unless the task explicitly changes platform)

In `iwsdk.config.json`:

- `world.xr.features.handTracking: { "required": true }`
- `world.xr.features.gazeTracking: true` (optional feature; do not set `required: true` unless the app cannot run without gaze)
- `world.features.gaze.showDebugReticle: true` (turn off for shipping UI)
- `dev.emulator.device: "metaVRGlasses"`
- `dev.targetDevicePreview.gazeSimulation: "head"` (dev server only)

**Field-of-view mask:** Meta’s getting-started guide documents `world.features.fieldOfViewMask: true`. The pinned `@iwsdk/core@1.0.0-rc.2` schema does **not** accept that property yet. Until packages upgrade, rely on the **metaVRGlasses** IWER profile and the toolbar **Field-of-view mask** (see [docs/DEPENDENCIES.md](./docs/DEPENDENCIES.md)). Re-add `fieldOfViewMask` to the manifest when the schema supports it.

Locomotion and grabbing stay **off** in the foundation. Opt in via manifest when a product needs them.

## Where to work

| Task | Location |
| --- | --- |
| Scene layout, interactables | [`public/scenes/main.iwsdk.scene.json`](./public/scenes/main.iwsdk.scene.json) |
| Procedural / catalog assets | [`src/assets.ts`](./src/assets.ts) |
| Interaction logic | New systems under `src/`, register in [`src/index.ts`](./src/index.ts) |
| Spatial UI markup | [`public/ui/welcome.uikitml`](./public/ui/welcome.uikitml) |
| Serializable world options | [`iwsdk.config.json`](./iwsdk.config.json) only |

Do **not** duplicate manifest feature flags inside `World.create()` unless you have a documented exception. Do **not** re-scaffold with `npm create @iwsdk` for feature work. Do **not** use retired `@meta-quest/iwsdk`.

## Interaction rules (Meta IWSDK)

- Gaze + pinch uses the same ray pointer path as hands; targets need `RayInteractable`.
- React to `Hovered` and `Pressed` (or pointer events). Gaze rays report `pointerType === "ray"` with `source: "gaze"` in pointer state if you need to filter.
- Do not add gaze-only components to entities.

## Verify changes

**Desktop**

```bash
npm run dev
```

Enter XR → **Gaze + Hands** → look at tile → pinch → confirm status text updates.

**Headset (Quest 3 / 3S)**

Open the dev HTTPS URL in Quest Browser → enter immersive VR → repeat look / pinch.

Run `npm run typecheck` before finishing TypeScript edits.

## Meta documentation

Canonical links: [docs/META.md](./docs/META.md). Optional deeper patterns: [Meta IWSDK WebXR skill](https://github.com/meta-quest/agentic-tools/blob/main/skills/hz-iwsdk-webxr/SKILL.md). Do not install Meta VR CLI or extra tooling unless the user asks.

## Conflict resolution

If this file, README, or comments disagree with [Meta’s IWSDK glasses guide](https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/), follow Meta and update local docs in the same change.
