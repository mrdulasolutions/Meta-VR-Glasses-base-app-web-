# Dependencies

Recorded for **2026-09-29** from `package.json` / `package-lock.json` after scaffold.

## Runtime

| Package | Version | Role |
| --- | --- | --- |
| `@iwsdk/core` | 1.0.0-rc.2 | IWSDK runtime, ECS, WebXR world |
| `three` | `super-three@0.181.0` | Renderer (IWSDK-pinned fork) |
| `@pmndrs/uikit` | ^1.0.74 | Spatial UI (Horizon kit) |
| `@pmndrs/uikit-horizon` | ^1.0.74 | Horizon UI components |
| `@pmndrs/uikit-lucide` | ^1.0.74 | Icons in UIKitML |

## Development

| Package | Version | Role |
| --- | --- | --- |
| `@iwsdk/vite-plugin-dev` | 1.0.0-rc.2 | Vite dev plugin, IWER injection |
| `@iwsdk/cli` | 1.0.0-rc.2 | `iwsdk dev` managed server |
| `@iwsdk/reference` | 1.0.0-rc.2 | Reference tooling (optional RAG) |
| `@meta-quest/metavr` | ^1.3.2 | Meta VR CLI (devDependency from template) |
| `vite` | ^7.1.4 | Bundler |
| `typescript` | ^5.5.0 | Typecheck |

## Node

`engines.node`: `>=20.19.0 <21 || >=22.12.0 <23 || >=24.0.0`

## Scaffold command used

```bash
npm create @iwsdk@latest . -- --yes --force --no-git --target vr --no-locomotion --no-grabbing
```

## Upgrade procedure

1. Re-read [Meta glasses getting started](https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/) and [Gaze and Pinch](https://iwsdk.dev/concepts/xr-input/gaze.html).
2. Bump **`@iwsdk/core`**, **`@iwsdk/vite-plugin-dev`**, **`@iwsdk/cli`**, and **`@iwsdk/reference`** to the **same** release line (prefer latest stable or documented RC together).
3. Run `npm install` and commit `package-lock.json`.
4. If the new schema supports it, add `"fieldOfViewMask": true` under `world.features` in `iwsdk.config.json`.
5. Run `npm run typecheck` and `npm run build`.
6. Run `npm run dev` and repeat the basics bench (Gaze + Hands, pinch, FOV mask toggle).
7. Update this file with new versions and notes.

## Known version gap

| Meta doc property | Status in `@iwsdk/core@1.0.0-rc.2` |
| --- | --- |
| `world.features.fieldOfViewMask` | **Not in JSON schema** — build fails if present. Use IWER **metaVRGlasses** mask until upgraded. |

Do **not** add legacy `@meta-quest/iwsdk`.
