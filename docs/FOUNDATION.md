# Foundation guide

Use this repo as the **starting point** for new Meta VR Glasses **web** apps. Copy or fork it, then replace bench content with product content while keeping the glasses contract.

For Unity, Unreal, Android, or native work, use [BUILD_FOR_GLASSES.md](./BUILD_FOR_GLASSES.md) and [META.md](./META.md) — this foundation does not scaffold those stacks.

## What to keep

1. **`iwsdk.config.json` glasses block** — hand tracking required, gaze optional, `metaVRGlasses` emulator, dev gaze preview, debug reticle (disable for ship).
2. **Manifest-first configuration** — world/XR/features in JSON; systems in TypeScript.
3. **Interaction pattern** — `RayInteractable` on targets; systems listen for `Hovered` / `Pressed`.
4. **Docs layout** — update [META.md](./META.md) dates when you re-verify Meta pages.

## What to replace

| Bench artifact | Replace with |
| --- | --- |
| Nine tiles in `main.iwsdk.scene.json` | Your scene graph |
| Procedural tiles in `src/assets.ts` | Your assets (glTF, UIKitML, prototypes) |
| `BenchTileSystem` | Your gameplay / UI systems |
| `welcome.uikitml` status copy | Your spatial UI |

Register new systems in [`src/index.ts`](../src/index.ts):

```typescript
world.registerSystem(YourSystem);
```

Remove or rename `BenchTileSystem` when the bench is no longer needed.

## Opt-in features

When a product needs them, enable in **`iwsdk.config.json`** only (not duplicated in code):

- **`world.features.grabbing`** — distance / hand grab (`DistanceGrabbable` on entities)
- **`world.features.locomotion`** — comfort locomotion packages

Re-test gaze priority after enabling near grab (gaze yields to direct manipulation by default).

## Field-of-view mask (manifest)

Meta documents:

```json
"world": {
  "features": {
    "fieldOfViewMask": true
  }
}
```

Add this when your `@iwsdk/core` version’s schema includes `fieldOfViewMask`. Until then, keep `dev.emulator.device: "metaVRGlasses"` and use the IWER mask toggle for desktop coverage tests.

## New project checklist

1. Clone or copy this repository.
2. Rename `package.json` `name` if desired.
3. Replace scene + assets + systems.
4. Run `npm run dev` and complete the [SETUP.md](./SETUP.md) bench flow.
5. Update [DEPENDENCIES.md](./DEPENDENCIES.md) after any `@iwsdk/*` bump.
6. Refresh [META.md](./META.md) “last checked” date.

## Anti-patterns

- Running `npm create @iwsdk@latest` inside an existing foundation repo (loses docs and contract).
- Adding gaze-specific components instead of `RayInteractable`.
- Hard-coding glasses FOV in camera code instead of using mask + layout tests documented by Meta.
