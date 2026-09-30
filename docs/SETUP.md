# Setup

## Prerequisites

- **Node.js:** `>=20.19.0` (Node 20 line), `>=22.12.0` (Node 22), or Node 24+ (see `package.json` `engines`)
- **npm:** bundled with Node
- **Browser:** current Chrome, Edge, Firefox, or Safari for desktop IWER
- **Optional:** Quest 3 or 3S with developer mode for on-headset checks

## Install

From the repo root:

```bash
npm install
```

## Development server

```bash
npm run dev
```

The IWSDK CLI starts Vite with HTTPS (required for WebXR on device). The command opens a browser tab when possible.

Other scripts:

| Script | Use |
| --- | --- |
| `npm run typecheck` | TypeScript without emit |
| `npm run build` | Production bundle |
| `npm run dev:status` | Managed dev server status |
| `npm run dev:down` | Stop managed dev server |

## Desktop bench test (IWER)

1. Run `npm run dev`.
2. Click **Enter XR** (or use the in-scene panel).
3. Open **Select input mode** in the IWER toolbar → **Gaze + Hands**.
4. Move the cursor to aim gaze; **right-drag** to look around.
5. Hover a numbered tile (it brightens), then **pinch** with the emulated commit hand.
6. Read **INTERACTION** on the status panel.
7. Toggle **Field-of-view mask** in the toolbar to preview Meta VR Glasses angular coverage. Yellow corner markers in the scene mark the nominal ~70° × 66° bounds at ~2 m (upper bound per Meta essentials).

Turn **gaze mode Off** in the toolbar to confirm hand far rays resume (fallback behavior).

## Quest Browser test

1. Ensure the dev machine and headset are on the same network.
2. Open the **HTTPS** dev URL shown in the terminal (not plain HTTP).
3. Enter immersive VR from the page or panel.
4. Repeat look / pinch on tiles. Head-directed gaze preview applies only on the Vite dev server when `dev.targetDevicePreview.gazeSimulation` is `"head"`.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| No Enter XR on headset | Non-HTTPS URL or blocked WebXR |
| Pinch does nothing | Input mode not **Gaze + Hands** |
| Black scene after hot reload | Full page reload (known HMR + XR quirk) |
| Manifest error on `fieldOfViewMask` | Property not in `@iwsdk/core@1.0.0-rc.2`; use IWER mask + upgrade path in [DEPENDENCIES.md](./DEPENDENCIES.md) |

See also [Meta: Testing your experience](https://developers.meta.com/horizon/documentation/iwsdk/guides/02-testing-experience/).
