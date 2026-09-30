# Meta documentation map

Use these pages as the **canonical** source. Local README / AGENTS content summarizes workflow only.

**Last checked:** 2026-09-29

## Glasses + web (primary)

| Topic | URL |
| --- | --- |
| Get started with Meta VR Glasses (IWSDK) | https://developers.meta.com/horizon/documentation/iwsdk/guides/get-started-glasses/ |
| IWSDK project setup | https://developers.meta.com/horizon/documentation/iwsdk/guides/01-project-setup/ |
| Testing your experience (IWER, glasses FOV) | https://developers.meta.com/horizon/documentation/iwsdk/guides/02-testing-experience/ |
| Gaze and Pinch (concepts) | https://iwsdk.dev/concepts/xr-input/gaze.html |
| Pointers (ray / grab / touch) | https://developers.meta.com/horizon/documentation/iwsdk/concepts/xr-input/pointers/ |

## Essentials

| Topic | URL |
| --- | --- |
| Get started with Meta VR Glasses | https://developers.meta.com/horizon/essentials/get-started-with-glasses/ |
| Field of view (nominal 70° × 66°) | https://developers.meta.com/horizon/essentials/field-of-view/ |

## Reference implementation

| Topic | URL |
| --- | --- |
| IWSDK `gaze-pinch` example (upstream) | https://github.com/facebook/immersive-web-sdk/tree/main/examples/gaze-pinch |

## Agent tooling (optional)

| Topic | URL |
| --- | --- |
| Meta Quest agentic tools / IWSDK skill | https://github.com/meta-quest/agentic-tools/blob/main/skills/hz-iwsdk-webxr/SKILL.md |

## Re-verification checklist

When updating `@iwsdk/*` packages:

- [ ] Glasses getting-started manifest snippet still matches `iwsdk.config.json`
- [ ] Gaze optional vs required hand tracking unchanged
- [ ] `fieldOfViewMask` schema support (add to manifest if validated)
- [ ] Desktop test flow: **Gaze + Hands**, pinch, FOV mask toolbar
- [ ] Update **Last checked** date on this page
