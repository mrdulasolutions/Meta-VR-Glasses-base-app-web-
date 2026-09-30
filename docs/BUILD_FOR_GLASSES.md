# Build for Meta VR Glasses

This guide is the **developer map** for Meta VR Glasses (pre-release hardware). It summarizes what is common across platforms, how to test before you have glasses, and where to go for each build path.

**This repository implements the web path only.** Other paths are documented here with links to Meta’s canonical docs. When anything here disagrees with Meta, [Meta wins](./META.md#conflict-resolution).

**Last updated:** 2026-09-29

---

## 1. What you are building for

Meta VR Glasses target a **look + pinch** interaction model and a **narrower view** than a full Quest headset.

| Topic | What Meta documents | Practical implication |
| --- | --- | --- |
| **Targeting** | Gaze (eye or head-directed in dev) chooses the focus target | UI and interactables must be visible in the user’s view; avoid edge-only critical controls |
| **Selection** | Hand **pinch** commits the action (same as “click”) | Require hand tracking for glasses-first apps; do not rely on controller-only flows |
| **Field of view** | Nominal **~70° horizontal × ~66° vertical** straight ahead ([FOV essentials](https://developers.meta.com/horizon/essentials/field-of-view/)) | Treat as an **upper bound**; fit, eye position, and gaze reduce visible area |
| **FOV preview** | Masks/simulators approximate **angular coverage**, not lens shape or native projection | Use masks to catch clipped UI; still validate on device when hardware is available |
| **Web on glasses** | Quest Browser / WebXR remains a primary consumption path | IWSDK web apps are a first-class path, not a fallback |

There is **no separate “convert to Glasses binary”** step for web: you build a glasses-aware experience on your chosen stack and validate with simulators + Quest stand-ins until hardware ships.

---

## 2. Choose your development path

Pick the path that matches your codebase. All paths can be started **before** Glasses hardware is available.

| Path | Best for | Primary IDE / tools | Meta glasses entry doc |
| --- | --- | --- | --- |
| **Web (IWSDK)** | New 3D web XR, this repo | Node + Vite + IWER | [Get started with Glasses (IWSDK)](https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/) |
| **Android / 2D panels** | Existing Android apps, multi-window panels | Android Studio + Horizon plugin | [What's new in Glasses (Android)](https://developers.meta.com/horizon/documentation/android-apps/whats-new-in-glasses) |
| **Spatial SDK** | Kotlin-first spatial Android | Android Studio | [Spatial SDK docs](https://developers.meta.com/horizon/documentation/spatial-sdk/) |
| **Unity** | Games / immersive Unity | Unity + Meta XR + Interaction SDK | [Support Meta VR Glasses (Unity)](https://developers.meta.com/horizon/documentation/unity/unity-support-meta-vr-glasses/) |
| **Unreal** | Games / immersive Unreal | Unreal + Meta XR Interaction SDK | [Support Meta VR Glasses (Unreal)](https://developers.meta.com/horizon/documentation/unreal/unreal-support-meta-vr-glasses/) |
| **Native OpenXR** | C/C++ OpenXR | Platform toolchain | [Native / OpenXR](https://developers.meta.com/horizon/documentation/native/) |

**Orientation:** [Quick start — choose your development path](https://developers.meta.com/horizon/essentials/quick-start/#choose-your-development-path)

**Essentials hub:** [Get started with Meta VR Glasses](https://developers.meta.com/horizon/essentials/get-started-with-glasses/)

---

## 3. Shared interaction model (all immersive paths)

Glasses-first immersive apps should assume:

1. **Far targeting** — gaze ray (or dev fallback) selects among ray-interactable targets.
2. **Commit** — pinch confirms selection (both hands typically supported).
3. **Near manipulation** — direct hand touch/grab **wins over gaze** when active (IWSDK default; mirror this in other stacks).

### Web (IWSDK) — implemented in this repo

- Enable `handTracking` + `gazeTracking` in [`iwsdk.config.json`](../iwsdk.config.json).
- Mark targets with **`RayInteractable`** in the scene JSON.
- React to **`Hovered`** and **`Pressed`** in systems (see [`src/bench-tile-system.ts`](../src/bench-tile-system.ts)).
- Do **not** add gaze-only components to entities ([Gaze and Pinch](https://iwsdk.dev/concepts/xr-input/gaze.html)).

### Unity / Unreal

- Enable **Gaze Interaction** in **Meta XR Interaction SDK** (Quick Actions / building blocks in Unity; plugin settings in Unreal).
- Use **Meta XR Simulator** with device profile **Meta VR Glasses** and **Look and Pinch** input mode.
- Unity: [Simulating Look and Pinch](https://developers.meta.com/horizon/documentation/unity/xrsim-look-and-pinch/)
- Unreal: [Simulating Look and Pinch (Unreal)](https://developers.meta.com/horizon/documentation/unreal/xrsim-look-and-pinch/)

### Android (panel / spatial)

- Gaze drives focus; system pinch activates focused elements (D-pad + pinch model for many 2D apps).
- **Meta Spatial Simulator** — desktop panel preview for **2D Android** apps ([Spatial Simulator overview](https://developers.meta.com/horizon/documentation/android-apps/spatial-sim-overview/)).
- Layout / gaze SDKs: see [Meta Connect build paths recap](https://developers.meta.com/blog/meta-connect-recap-start-building-the-future-of-vr/) (Layout, Gaze, UI Set SDKs).

---

## 4. Test without Glasses hardware

Use this matrix during development. Simulators **do not** replace on-device comfort and platform integration tests.

| Your path | Desktop simulator | Headset stand-in (today) | What you validate |
| --- | --- | --- | --- |
| **Web / IWSDK** | IWER + `dev.emulator.device: metaVRGlasses`, **Gaze + Hands** | Quest 3 / 3S Quest Browser (HTTPS dev URL) | Gaze+pinch plumbing, FOV mask / layout |
| **Unity / Unreal / Native OpenXR** | **Meta XR Simulator** — device **Meta VR Glasses**, **Look and Pinch** | Quest 3 / 3S on-device | OpenXR input bindings, gaze rig |
| **Android 2D** | **Meta Spatial Simulator** (`metavr ssim`) | Quest (deploy APK) | Panel layout, focus, windowing |

### Web / this repository (step-by-step)

Detailed steps: [SETUP.md](./SETUP.md).

```bash
npm install
npm run dev
```

1. Enter XR in the browser.
2. IWER toolbar → **Gaze + Hands**.
3. Look at bench tiles → pinch → read status panel.
4. Toggle **Field-of-view mask** (IWER; see [DEPENDENCIES.md](./DEPENDENCIES.md) for manifest `fieldOfViewMask` when SDK supports it).
5. Optional Quest test: same HTTPS URL in Quest Browser; dev-only head gaze preview via `dev.targetDevicePreview.gazeSimulation`.

### CLI-driven web tests (optional)

With a managed IWSDK emulator session:

```bash
npx @iwsdk/cli xr enter
npx @iwsdk/cli xr set-input-mode --input-json '{"mode":"hand"}'
npx @iwsdk/cli xr look-at --input-json '{"device":"gaze","target":{"x":0,"y":1.2,"z":-2}}'
npx @iwsdk/cli xr select --input-json '{"device":"hand-right"}'
```

See [Gaze and Pinch — CLI](https://iwsdk.dev/concepts/xr-input/gaze.html#drive-tests-from-the-cli).

### Meta XR Simulator install

- [Meta XR Simulator — Windows](https://developers.meta.com/downloads/package/meta-xr-simulator-windows/)
- [Meta XR Simulator — macOS](https://developers.meta.com/downloads/package/meta-xr-simulator-mac-arm/)
- [Get started with Meta XR Simulator (Unity)](https://developers.meta.com/horizon/documentation/unity/xrsim-getting-started/)

---

## 5. Web path in this repo (IWSDK foundation)

| Artifact | Role |
| --- | --- |
| [`iwsdk.config.json`](../iwsdk.config.json) | Glasses manifest contract (hands, gaze, emulator, dev preview) |
| [`public/scenes/main.iwsdk.scene.json`](../public/scenes/main.iwsdk.scene.json) | Scene: 3×3 tiles, FOV markers, status panel |
| [`src/bench-tile-system.ts`](../src/bench-tile-system.ts) | Hover + pinch feedback |
| [FOUNDATION.md](./FOUNDATION.md) | How to extend without re-scaffolding |
| [AGENTS.md](../AGENTS.md) | Agent fast path |

Extend the foundation: replace scene content, keep the glasses block in the manifest, register new systems in [`src/index.ts`](../src/index.ts).

Upstream reference: [IWSDK `gaze-pinch` example](https://github.com/facebook/immersive-web-sdk/tree/main/examples/gaze-pinch).

---

## 6. Design and layout for Glasses FOV

1. Place primary UI **inside** the nominal 70° × 66° cone at the distances you care about.
2. Use FOV mask / simulator overlays to find clipped content (this bench adds **yellow corner markers** at ~2 m).
3. Do not treat mask edges as exact lens cutoffs ([Meta testing guide](https://developers.meta.com/horizon/documentation/iwsdk/guides/02-testing-experience/)).
4. For 2D Android, use Meta’s window sizing / responsive layout guidance ([Android gaze app config](https://developers.meta.com/horizon/documentation/android-apps/gaze-app-config)).

---

## 7. Shipping and distribution

### Web / IWSDK (this repo)

1. **Build:** `npm run build` → `dist/`
2. **Host:** public **HTTPS** origin (required for WebXR and store packaging). See bundled skill [`.agents/skills/iwsdk-hosting`](../.agents/skills/iwsdk-hosting/SKILL.md).
3. **Optional store APK:** package as PWA/TWA for Horizon Store — [`.agents/skills/iwsdk-pwa-packaging`](../.agents/skills/iwsdk-pwa-packaging/SKILL.md). Meta documents PWAs as a viable path for web experiences on Glasses.

### Native / engine paths

- Follow [Test your app](https://developers.meta.com/horizon/essentials/test-your-app) and [App compatibility for Meta VR Glasses](https://developers.meta.com/horizon/essentials/app-compatibility).
- **arm64** Android builds, hand-tracking permission when using hands, Device Readiness / Muse tooling as applicable (Unity/Unreal v207+).

---

## 8. Porting existing apps (not automatic conversion)

| Source | Typical approach |
| --- | --- |
| Quest-only **web** IWSDK app | Add glasses manifest flags + retest gaze/pinch; use this foundation as a diff reference |
| Quest **Unity/Unreal** app | Run Device Readiness / enable Gaze Interaction; verify simulator Look and Pinch |
| **Flat Android** app | Spatial Simulator + Layout/Gaze SDKs; panel-first UX |
| **Controller-only** VR app | Redesign input for hands + gaze; controllers may not be glasses-first |

Meta’s blog overview of v207 capabilities: [Start building the future of VR](https://developers.meta.com/blog/meta-connect-recap-start-building-the-future-of-vr/).

---

## 9. Tooling and AI agents

| Tool | Use |
| --- | --- |
| [Meta VR CLI](https://developers.meta.com/horizon/documentation/android-apps/ts-ai-tooling-mcp) (`metavr`) | Simulators, deploy, docs (optional in this repo) |
| [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-mqdh-overview/) | Device deploy, logs, casting |
| IWSDK skills in [`.agents/skills/`](../.agents/skills/) | Scene, hosting, PWA, native XR test |
| [Meta agentic IWSDK skill](https://github.com/meta-quest/agentic-tools/blob/main/skills/hz-iwsdk-webxr/SKILL.md) | External reference (not installed by default) |

Agents working **in this repo** should read [AGENTS.md](../AGENTS.md) first.

---

## 10. When Glasses hardware arrives

1. Re-run the same test matrix on **physical Glasses** (web via browser, native via deployed builds).
2. Replace dev-only gaze simulation with production eye tracking where available.
3. Turn off `showDebugReticle` for shipping web UI.
4. Add manifest `fieldOfViewMask` when your IWSDK version’s schema supports it ([DEPENDENCIES.md](./DEPENDENCIES.md)).
5. Re-verify store and compatibility checklists on Meta’s current [test your app](https://developers.meta.com/horizon/essentials/test-your-app) page.

---

## Related docs in this repository

| Doc | Contents |
| --- | --- |
| [SETUP.md](./SETUP.md) | Install, dev server, IWER + Quest Browser |
| [FOUNDATION.md](./FOUNDATION.md) | Extend this repo for a new web app |
| [DEPENDENCIES.md](./DEPENDENCIES.md) | IWSDK versions and upgrades |
| [META.md](./META.md) | Full link index to Meta documentation |
