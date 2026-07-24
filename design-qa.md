# Design QA — 文字滚动与展示框滚动动效

## Comparison setup

- Source visual truth: `C:\Users\Y7000P\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20260724-0606-08.0042738.mp4`
- Extracted source states:
  - `qa/motion-scroll/reference-statement.jpg`
  - `qa/motion-scroll/reference-frame-expansion.jpg`
  - `qa/motion-scroll/reference-kinetic-type.jpg`
- Browser-rendered implementation states:
  - `qa/motion-scroll/implementation-00-statement.png`
  - `qa/motion-scroll/implementation-01-frame-expansion.png`
  - `qa/motion-scroll/implementation-02-kinetic-type.png`
  - `qa/motion-scroll/implementation-mobile-00-cover.png`
  - `qa/motion-scroll/implementation-mobile-01-story.png`
  - `qa/motion-scroll/implementation-mobile-02-frame.png`
  - `qa/motion-scroll/implementation-mobile-04-selected-work.png`
- Side-by-side comparison evidence:
  - `qa/motion-scroll/comparison-00-statement.jpg`
  - `qa/motion-scroll/comparison-01-frame-expansion.jpg`
  - `qa/motion-scroll/comparison-02-kinetic-type.jpg`

## Viewport and normalization

- Desktop CSS viewport: `1440 × 900`.
- Desktop implementation capture: `1775 × 1125` physical pixels at the browser's `1.25` display scale; the content viewport measured `1420.83 × 900` CSS pixels after the native scrollbar.
- Mobile CSS viewport: `390 × 844`.
- Mobile implementation capture: `463 × 1055` physical pixels at the same `1.25` display scale.
- Source captures: `2560 × 1430`.
- Comparison boards: source and implementation were independently fit and padded to `1440 × 900`, then placed side by side at `2880 × 900`. Browser chrome was retained only on the source side as contextual evidence and excluded from fidelity judgments.
- The in-app capture compositor paints a narrow duplicate strip of the sticky navigation at the bottom edge in some scrolled screenshots. DOM inspection found exactly one `.section-nav`, positioned at the top with the expected rect, so the duplicate strip is classified as capture-only evidence and not a product defect.

## States compared

1. Pinned statement and layered-media handoff at scroll progress `0.345`.
2. Real-video frame expansion at scroll progress `0.572`; kinetic-title computed opacity was `0`.
3. Full media stage with kinetic typography at scroll progress `0.722`; kinetic-title computed opacity was `1`.
4. Mobile statement-to-frame sequence at `390 × 844`.
5. Mobile selected-work landing state, including the horizontally scrollable filter and first project-frame reveal.

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: the implementation preserves the site's existing bilingual hierarchy and high-weight Chinese display treatment while matching the reference's oversized, low-line-height kinetic composition. Desktop text remains inside the visible stage through the compared states; mobile switches to a readable static stack instead of forcing desktop scatter transforms into a narrow viewport.
- Spacing and layout rhythm: the pinned stage, frame crop, corner radius, rotation, and full-viewport expansion follow the reference sequence without replacing the portfolio's existing navigation or project information. The mobile frame uses a `4 / 5` crop and safe horizontal margins, with no horizontal page overflow.
- Colors and tokens: the light editorial canvas, near-black media surfaces, and `#6643ff` interaction accent remain consistent with the established portfolio system. The reference's cyan path was intentionally not copied because the task is motion adaptation, not brand cloning.
- Image quality and asset fidelity: every new motion state uses the existing real project MP4 and poster assets. No placeholder, generated stand-in, custom SVG, CSS illustration, or fake media asset was introduced. Object-fit crops remain sharp and compositionally useful on desktop and mobile.
- Copy and content: new Chinese and English lines are portfolio-specific, concise, and consistent with the existing director / AI-visual positioning. Existing project titles, roles, media, and contact information are unchanged.
- Icons and controls: existing icon-library controls remain intact. The expanding media frame is a real button with an accessible project label, visible focus treatment, and disabled tab stop while hidden.
- Behavior and accessibility: selected-work navigation, category filtering, project-dialog open/close, videos, and scroll navigation were exercised in the browser. The reduced-motion branch presents the statement, frame, kinetic text, and identity panel as a readable static sequence. Console check returned zero warnings and zero errors.
- Responsiveness: desktop and `390 × 844` mobile states were checked. The mobile filter scrollbar is hidden while horizontal touch scrolling remains available; project cards, frame captions, and navigation remain inside the viewport.

## Comparison history

### Iteration 1

- Earlier P2: kinetic typography began while the display frame was still expanding, so the frame did not receive a clean full-screen beat.
- Fix: delayed kinetic reveal from progress `0.54` to `0.61` and delayed scatter to `0.70`.
- Post-fix evidence: `comparison-01-frame-expansion.jpg` shows the expanded project frame with kinetic opacity `0`; `comparison-02-kinetic-type.jpg` shows the separate full-screen typography beat.

### Iteration 2

- Earlier P2: the Windows mobile capture exposed a thick native scrollbar below the selected-work filters.
- Fix: added standards-based and WebKit scrollbar hiding while preserving `overflow-x: auto`.
- Post-fix evidence: `implementation-mobile-04-selected-work.png`; computed `scrollbar-width` is `none`, and the filter remains horizontally scrollable.

## Focused region evidence

- Display frame: the full frame region was compared in `comparison-01-frame-expansion.jpg`; crop, rounded-to-full expansion, rotation, real-video quality, and frame metadata are readable at the selected state.
- Kinetic title: the title region was compared in `comparison-02-kinetic-type.jpg`; three-line scale, overlap, contrast, split direction, and relationship to the moving subject are legible without a separate crop.
- Mobile: `implementation-mobile-01-story.png` and `implementation-mobile-02-frame.png` provide focused evidence for text wrapping, frame margins, media crop, and caption placement.

## Primary interactions tested

- Sticky section navigation to Selected Work.
- Category filter from All to Narrative, producing exactly three project cards.
- First project card opens one modal dialog.
- Close control removes the open dialog.
- Desktop and mobile scroll states update the active media and motion phase.
- Browser console: zero warnings and zero errors.

## Follow-up polish

- P3: clips with burned-in titles can briefly compete with the frame's own project metadata. This is acceptable because the real portfolio footage is the visual truth; future media exports could reserve a title-safe area if desired.

final result: passed
