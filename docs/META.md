# Meta documentation map

Use these pages as the **canonical** source. Local README / AGENTS content summarizes workflow only.

**Last checked:** 2026-09-29

**Start here locally:** [BUILD_FOR_GLASSES.md](./BUILD_FOR_GLASSES.md) — full developer map (paths, testing, shipping, porting).

## Conflict resolution

If any file in this repository disagrees with Meta Developer Center, **follow Meta** and update local docs in the same change.

---

## Glasses essentials

| Topic | URL |
| --- | --- |
| Get started with Meta VR Glasses | https://developers.meta.com/horizon/essentials/get-started-with-glasses/ |
| Quick start (paths, MQDH, simulators) | https://developers.meta.com/horizon/essentials/quick-start/ |
| Choose your development path | https://developers.meta.com/horizon/essentials/quick-start/#choose-your-development-path |
| Field of view (nominal 70° × 66°) | https://developers.meta.com/horizon/essentials/field-of-view/ |
| Test your app | https://developers.meta.com/horizon/essentials/test-your-app |
| App compatibility for Meta VR Glasses | https://developers.meta.com/horizon/essentials/app-compatibility |
| Meta Connect — build paths recap (v207) | https://developers.meta.com/blog/meta-connect-recap-start-building-the-future-of-vr/ |

---

## Web — Immersive Web SDK (this repo)

| Topic | URL |
| --- | --- |
| Get started with Meta VR Glasses (IWSDK) | https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/ |
| IWSDK project setup | https://developers.meta.com/horizon/documentation/iwsdk/guides/01-project-setup/ |
| Testing your experience (IWER, glasses FOV) | https://developers.meta.com/horizon/documentation/iwsdk/guides/02-testing-experience/ |
| Gaze and Pinch (concepts) | https://iwsdk.dev/concepts/xr-input/gaze.html |
| Pointers (ray / grab / touch) | https://developers.meta.com/horizon/documentation/iwsdk/concepts/xr-input/pointers/ |
| IWSDK `gaze-pinch` example (upstream) | https://github.com/facebook/immersive-web-sdk/tree/main/examples/gaze-pinch |

---

## Unity

| Topic | URL |
| --- | --- |
| Support Meta VR Glasses | https://developers.meta.com/horizon/documentation/unity/unity-support-meta-vr-glasses/ |
| Meta XR Simulator intro | https://developers.meta.com/horizon/documentation/unity/xrsim-intro/ |
| Meta XR Simulator getting started | https://developers.meta.com/horizon/documentation/unity/xrsim-getting-started/ |
| Simulating Look and Pinch | https://developers.meta.com/horizon/documentation/unity/xrsim-look-and-pinch/ |
| Meta XR Simulator — Windows download | https://developers.meta.com/downloads/package/meta-xr-simulator-windows/ |
| Meta XR Simulator — macOS download | https://developers.meta.com/downloads/package/meta-xr-simulator-mac-arm/ |

---

## Unreal

| Topic | URL |
| --- | --- |
| Support Meta VR Glasses | https://developers.meta.com/horizon/documentation/unreal/unreal-support-meta-vr-glasses/ |
| Interaction SDK overview | https://developers.meta.com/horizon/documentation/unreal/unreal-isdk-overview/ |
| Meta XR Simulator getting started (Unreal) | https://developers.meta.com/horizon/documentation/unreal/xrsim-getting-started/ |
| Simulating Look and Pinch (Unreal) | https://developers.meta.com/horizon/documentation/unreal/xrsim-look-and-pinch/ |

---

## Android / Spatial

| Topic | URL |
| --- | --- |
| What's new in Meta VR Glasses (Android) | https://developers.meta.com/horizon/documentation/android-apps/whats-new-in-glasses |
| Meta Spatial Simulator overview | https://developers.meta.com/horizon/documentation/android-apps/spatial-sim-overview/ |
| Meta Horizon Android Studio plugin | https://developers.meta.com/horizon/documentation/android-apps/meta-horizon-android-studio-plugin |
| Gaze app config (window sizing) | https://developers.meta.com/horizon/documentation/android-apps/gaze-app-config |
| Spatial SDK documentation hub | https://developers.meta.com/horizon/documentation/spatial-sdk/ |
| Meta VR CLI / AI tooling | https://developers.meta.com/horizon/documentation/android-apps/ts-ai-tooling-mcp |

---

## Native OpenXR

| Topic | URL |
| --- | --- |
| Native documentation hub | https://developers.meta.com/horizon/documentation/native/ |

---

## Agent tooling (optional)

| Topic | URL |
| --- | --- |
| Meta Quest agentic tools / IWSDK skill | https://github.com/meta-quest/agentic-tools/blob/main/skills/hz-iwsdk-webxr/SKILL.md |

---

## Re-verification checklist (IWSDK / this repo)

When updating `@iwsdk/*` packages:

- [ ] Glasses getting-started manifest snippet still matches `iwsdk.config.json`
- [ ] Gaze optional vs required hand tracking unchanged
- [ ] `fieldOfViewMask` schema support (add to manifest if validated)
- [ ] Desktop test flow: **Gaze + Hands**, pinch, FOV mask toolbar
- [ ] Update **Last checked** date on this page and in [BUILD_FOR_GLASSES.md](./BUILD_FOR_GLASSES.md)
