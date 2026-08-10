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
  - `qa/motion-scroll/implementation-03-statement-spacing.png`
  - `qa/motion-scroll/implementation-04-kinetic-spacing.png`
  - `qa/motion-scroll/implementation-mobile-05-statement-spacing.png`
  - `qa/motion-scroll/implementation-mobile-06-kinetic-spacing.png`
  - `qa/motion-scroll/implementation-07-statement-open.png`
  - `qa/motion-scroll/implementation-08-kinetic-open.png`
  - `qa/motion-scroll/implementation-mobile-09-statement-open.png`
  - `qa/motion-scroll/implementation-mobile-10-kinetic-open.png`
- Side-by-side comparison evidence:
  - `qa/motion-scroll/comparison-00-statement.jpg`
  - `qa/motion-scroll/comparison-01-frame-expansion.jpg`
  - `qa/motion-scroll/comparison-02-kinetic-type.jpg`
  - `qa/motion-scroll/comparison-03-statement-spacing.jpg`
  - `qa/motion-scroll/comparison-04-kinetic-spacing.jpg`
  - `qa/motion-scroll/comparison-05-statement-open.jpg`
  - `qa/motion-scroll/comparison-06-kinetic-open.jpg`

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

### Iteration 3

- Earlier P1: the pinned statement wrapped into three dense lines at the annotated desktop state, making the message feel closed and visually congested.
- Fix: widened the statement field from `53vw` to `78vw`, reduced the display scale, opened the line-height and inter-line gap, and preserved a deliberate second-line offset. The sentence now resolves as two stable editorial lines at the inspected desktop viewport.
- Earlier P1: the three-line kinetic title used an excessively compressed line-height and shared center axis, so the lines visually collapsed into one block.
- Fix: increased vertical rhythm, loosened tracking, and introduced controlled per-line horizontal offsets while keeping the scroll-driven split motion. Mobile explicitly removes those offsets so `脱离画框` no longer breaks mid-word.
- Post-fix evidence: `comparison-03-statement-spacing.jpg`, `comparison-04-kinetic-spacing.jpg`, `implementation-mobile-05-statement-spacing.png`, and `implementation-mobile-06-kinetic-spacing.png`.

### Iteration 4

- User follow-up: the first spacing pass still looked too close to the previous version.
- Fix: made the difference intentionally visible rather than incremental. The statement now uses an `84vw` field, a smaller `5.6vw` display scale, and up to `56px` of inter-line space. The kinetic title uses up to `52px` vertical gaps and substantially larger left/right offsets.
- Fix: changed the expanding third line to scale from its top edge and reduced its growth multiplier from `1.7` to `0.75`. At the measured desktop keyframe, the first two lines are `76.3px` high with a computed `31.68px` flex gap; the transformed third line begins another `31.68px` below the second line instead of growing upward into it.
- Fix: completed the intro fade before the statement takes over so the earlier Work Index copy and scroll cue do not visually crowd the new title.
- Post-fix evidence: `comparison-05-statement-open.jpg`, `comparison-06-kinetic-open.jpg`, `implementation-mobile-09-statement-open.png`, and `implementation-mobile-10-kinetic-open.png`.

## Focused region evidence

- Display frame: the full frame region was compared in `comparison-01-frame-expansion.jpg`; crop, rounded-to-full expansion, rotation, real-video quality, and frame metadata are readable at the selected state.
- Statement typography: `comparison-03-statement-spacing.jpg` confirms the annotated message now holds two open lines with a wider text field and more surrounding whitespace.
- Kinetic title: `comparison-04-kinetic-spacing.jpg` confirms the three lines use distinct vertical and horizontal positions while retaining contrast, split direction, and relationship to the moving subject.
- Mobile: `implementation-mobile-05-statement-spacing.png` and `implementation-mobile-06-kinetic-spacing.png` provide focused evidence for text wrapping, safe offsets, frame margins, media crop, and caption placement.

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

---

# Design QA — 自我评价文字左对齐

## Comparison setup

- Source visual truth: `C:\Users\Y7000P\AppData\Local\Temp\codex-clipboard-15a4d793-424e-4aeb-88fc-4e5589307388.png`，用于标记修改前第二、第三行内容列横向错位的问题；用户要求三行共享同一左侧基线。
- Browser-rendered implementation:
  - `qa/self-evaluation-aligned-838x1142.png`
  - `qa/self-evaluation-aligned-focused.png`
  - `qa/self-evaluation-mobile-390x844.png`
- Full-view side-by-side comparison: `qa/self-evaluation-source-vs-aligned.png`。
- Source-normalized comparison input: `qa/self-evaluation-source-normalized.png`。

## Viewport and normalization

- Source screenshot: `838 × 1142` physical pixels。
- Desktop CSS viewport: `838 × 1142`；in-app browser capture: `823 × 1042` physical pixels after native browser chrome and scrollbar exclusion。
- Source normalization: retained the source's original scale and cropped its rightmost `15px` and bottom `100px` to `823 × 1042`; no stretch or density resampling was applied.
- Mobile CSS viewport: `390 × 844`；capture: `qa/self-evaluation-mobile-390x844.png`。
- Compared state: About section, Self Evaluation list visible, no dialog or hover state active。

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: Chinese display sizes, English subtitles, weights, line heights and existing per-card hierarchy remain unchanged. Only the horizontal starting position was normalized.
- Spacing and layout rhythm: all three desktop `.evaluation-copy` blocks, their headlines and both body paragraphs resolve to the same measured x-coordinate, `179.8958px`. Mobile headlines and paragraphs resolve to `22px` for all three rows.
- Colors and visual tokens: the light editorial canvas, near-black type and violet labels remain unchanged.
- Image quality and asset fidelity: this section contains no image assets; no placeholders, generated assets, SVGs or CSS illustrations were introduced.
- Copy and content: all Chinese and English copy remains unchanged.
- Responsiveness: desktop preserves the index column and a single aligned copy column. Mobile preserves the existing single-column stack and uses one `22px` left edge without horizontal overflow.
- Behavior and accessibility: sticky navigation to About remains functional. Browser console returned zero warnings and zero errors.

## Comparison history

### Iteration 1

- Earlier P2: the second row applied up to `72px` of additional left padding and the third row applied up to `32px`, so the three content blocks did not share a stable reading axis.
- Fix: removed the per-row horizontal offsets and applied explicit `text-align: left` to the shared `.evaluation-copy` rule.
- Regression protection: `scripts/verify.mjs` now requires the shared left alignment and rejects reintroduction of second- or third-row copy offsets.
- Post-fix evidence: `qa/self-evaluation-source-vs-aligned.png`, desktop measured x-coordinates `179.8958 / 179.8958 / 179.8958`, and mobile measured x-coordinates `22 / 22 / 22`.

## Focused region evidence

- Desktop focused capture: `qa/self-evaluation-aligned-focused.png` shows the shared content column without surrounding page sections.
- Mobile capture: `qa/self-evaluation-mobile-390x844.png` confirms the same left edge across index, title, subtitle and body copy in the single-column layout.
- A separate focused comparison was necessary because the requested change concerns text baselines that are harder to judge from the full About page.

## Primary interactions tested

- Sticky section navigation to About.
- Desktop scroll to the full three-row evaluation list.
- Responsive switch to `390 × 844` and mobile scroll through the evaluation list.
- Browser console: zero warnings and zero errors.
- Automated content/responsive verification and production build: passed.

## Follow-up polish

- No remaining P3 items for this scoped alignment change.

final result: passed

---

# Design QA — 核心技能卡片双语排版统一

## Comparison setup

- Source visual truth: `C:\Users\Y7000P\AppData\Local\Temp\codex-clipboard-0d2a815b-1981-4d69-8fc8-9964da0c8eed.png`.
- Browser-rendered desktop implementation: `qa/capabilities-unified-grid-desktop.png`.
- Browser-rendered mobile implementation: `qa/capabilities-unified-mobile-playwright.png`.
- Full side-by-side evidence: `qa/capabilities-before-after.png`.
- Compared state: Core Capabilities section after entering the portfolio; no hover, dialog, or transient animation state.

## Viewports and normalization

- Source screenshot: `1963 × 1238` physical pixels.
- Desktop QA widths: `1963`, `1366`, and `1024` CSS pixels.
- Mobile QA widths: `390` and `320` CSS pixels.
- Screenshots were captured from the live Vite preview with reduced-motion enabled so text geometry could be compared without animation drift.
- The side-by-side composite scales each input proportionally to one common comparison height; neither source nor implementation was stretched.

## Findings

No actionable P0, P1, P2, or P3 findings remain.

- Fonts and typography: every Chinese capability title uses one line, every English capability title uses one line, and all six cards share the same Chinese and English title offsets at each tested viewport.
- Spacing and layout rhythm: desktop cards share a `520px` height; mobile cards share a `450px` height. The title block now starts from a fixed internal baseline instead of moving in response to description length.
- Colors and tokens: the existing dark editorial surface, white Chinese display text, muted English text, and violet labels remain unchanged.
- Copy and content: all six Chinese titles, English titles, tool labels, Chinese descriptions, and English descriptions remain unchanged. No capability copy was removed, rewritten, or added.
- Responsiveness: `1963`, `1366`, `1024`, `390`, and `320` widths report zero horizontal overflow on cards and both title lines. The longest title, `VIDEO & ANIMATION GENERATION`, remains one clean line at every tested width.
- Behavior and accessibility: the entry control and sticky Capabilities navigation remain functional. Browser console and page-error checks return zero warnings and zero errors.
- Asset quality: this section uses typography and native card surfaces only; no placeholder or generated visual asset was introduced.

## Comparison history

### Iteration 1

- Earlier P2: `VIDEO & ANIMATION GENERATION` wrapped onto two lines while neighboring English headings remained single-line, shifting the Chinese title and making the second row appear uneven.
- Fix: introduced a dedicated responsive English-title scale and a single-line bilingual heading rule while preserving every character of the supplied copy.

### Iteration 2

- Earlier P2: equal card heights alone did not guarantee equal internal title positions on narrow screens because description length influenced the flex spacer.
- Fix: replaced the automatic title spacer with one fixed internal baseline and established explicit desktop/mobile card height baselines.

### Iteration 3

- Earlier P3: QA exposed a pre-existing `favicon.ico` 404 in the browser console.
- Fix: added an inline data-URI favicon so the final tested page produces no console warning or error without introducing another network dependency.

## Focused region evidence

- Desktop grid: `qa/capabilities-unified-grid-desktop.png` shows all six cards with matching title rhythm and a single-line English heading for capability 03.
- Mobile grid: `qa/capabilities-unified-mobile-playwright.png` shows the full six-card stack at `390px` with equal card heights and matching title offsets.
- Before/after: `qa/capabilities-before-after.png` makes the removed wrap and the normalized card rhythm directly comparable.

## Primary interactions and regression checks

- Enter Portfolio control.
- Sticky navigation to Capabilities.
- Automated geometry checks at five responsive widths.
- Card/title horizontal overflow checks.
- Console warning, console error, and page-error checks.
- Static verification script and production build.

final result: passed
