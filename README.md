# Glasses Web Foundation

Fast-path starter for **Meta VR Glasses** web apps using the [Immersive Web SDK (IWSDK)](https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/). This repo ships a **basics bench** that validates gaze targeting, pinch selection, and field-of-view coverage, plus agent-oriented docs for the next project.

## What this bench checks

| Check | What you do | What success looks like |
| --- | --- | --- |
| **Look** | Aim at numbered tiles | Tile brightens (hover feedback; debug reticle enabled in manifest) |
| **Pinch** | Pinch with either hand | Status panel shows last selected tile |
| **See** | Enter XR with `metaVRGlasses` emulator | IWER field-of-view mask + yellow corner markers approximate glasses coverage |

## Quick start

```bash
npm install
npm run dev
```

1. Open the local HTTPS URL from the dev server.
2. Enter XR.
3. In the IWER toolbar, choose **Gaze + Hands**.
4. Look at a tile, pinch to select, toggle **Field-of-view mask** to compare coverage.

On **Quest 3 / 3S**, open the same dev URL in Quest Browser and enter immersive VR. Head-simulated gaze (`dev.targetDevicePreview`) is dev-only plumbing, not production eye tracking.

## Documentation

| Doc | Purpose |
| --- | --- |
| [AGENTS.md](./AGENTS.md) | Fast path for coding agents |
| [docs/SETUP.md](./docs/SETUP.md) | Install, dev server, desktop and headset testing |
| [docs/FOUNDATION.md](./docs/FOUNDATION.md) | How to build the next app from this repo |
| [docs/DEPENDENCIES.md](./docs/DEPENDENCIES.md) | Pinned stack and upgrade procedure |
| [docs/META.md](./docs/META.md) | Canonical Meta documentation links |

## Meta source of truth

If local notes disagree with Meta’s docs, **Meta wins**. See [docs/META.md](./docs/META.md).
