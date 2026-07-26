# Architechnika — Three Directions (Creative Brief)

Authored collaboratively: Opus 5 (creative direction) + Fable 5 (engineering/synthesis), 2026-07-26.
Client: Architechnika, Inc. — architectural firm, San Juan, Puerto Rico. Est. 1980 lineage, 300+ projects.

---

# DIRECTION 01 — **CANTERA**
### *(named for the cut limestone of Old San Juan — the material that has held the city up for 500 years)*

> **Concept:** A quiet-luxury editorial monument — the site behaves like a well-bound monograph of a firm that has already proved itself, where restraint is the flex and every project is given the dignity of a full page.

## 1. Emotional register / who it convinces

**Register:** Composed. Unhurried. Adult. The site never raises its voice, because a firm with 300 projects and 44 years doesn't need to. The feeling on landing is the feeling of opening a heavy, matte-paper book in a very quiet room.

**Who it convinces:** hotel developers and brand-flag operators evaluating "brand-standard-grade"; institutional/healthcare due diligence; HNW residential clients allergic to salesmanship; anyone who must justify the hire to a board.

**What it explicitly rejects:** urgency, gradients, badges, testimonial carousels, "Let's build something amazing together," any word ending in *-solutions*.

## 2. Typography

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display | **Fraunces** (Google) | 300, 400 — optical size `9..144`, `SOFT 0`, `WONK 0` | Headline `opsz` 144 so terminals thin and serifs get sharp/editorial. Never bold. |
| Text | **Newsreader** (Google) | 300, 400, 400 italic | All body, captions, pull quotes. |
| Utility / meta | **Inter Tight** | 400, 500 | Nav, labels, project metadata, forms. Uppercase, tracked. Never a sentence longer than five words. |

**Scale (six sizes only):**
```
--t-display : clamp(3.5rem, 8.5vw, 8.75rem)   /* Fraunces 300, opsz 144 */
--t-title   : clamp(2rem, 3.6vw, 3.25rem)     /* Fraunces 400, opsz 72  */
--t-lead    : clamp(1.25rem, 1.6vw, 1.6rem)   /* Newsreader 300         */
--t-body    : 1.0625rem                        /* Newsreader 400, 17px  */
--t-small   : 0.875rem                         /* Newsreader 400        */
--t-meta    : 0.6875rem                        /* Inter Tight 500, caps */
```

**Letter-spacing:** display ≥4rem → `-0.035em`; title → `-0.02em`; lead/body → 0; meta caps → `+0.14em` (the loudest gesture, a whisper). Line-height: display `0.94`, title `1.06`, lead `1.45`, body `1.65`. Measure: 68ch body, 22ch display.

**Signature rule:** the firm's name is always `ArchiTechnika` with the internal capital T, in Fraunces, never letterspaced. The capital T is the logo.

## 3. Color system — ink on bone, one accent

```css
--bone:      #F4F1EA;  /* page — warm paper */
--bone-deep: #EAE5DA;  /* alternating section wash */
--ink:       #16171A;  /* text — near-black, blue cast, never #000 */
--ink-soft:  #55565B;  /* secondary */
--rule:      #D6D0C4;  /* 1px hairlines */
--cantera:   #A8462A;  /* THE accent — burnt clay/terracotta */
```
Dark mode: `#131316 / #191A1E / #EDE9E0 / #97948D / #2C2D32 / #C86A4A`.

Rules: accent at most 3× per viewport (active nav underline, link hover rule, featured index numeral). **No buttons have fill** — text + 1px ink rule that thickens to 2px cantera on hover. Photography untinted/unfiltered, no overlays (except nav-overlap scrim on hero). Hairlines carry the layout: 1px border-top only, never boxes.

## 4. Layout logic

12 columns, asymmetric editorial spine: content cols 2–8, **marginalia rail** cols 9–12 (dates, locations, sq ft, client in meta caps, baseline-aligned to the paragraph they annotate). Section padding `clamp(8rem, 14vw, 15rem)`. ~60% empty.

**Hero — "the held breath":** top third empty bone; middle: display headline (Fraunces 300, ragged-right, 3 lines); hairline; one meta line `SAN JUAN, PUERTO RICO · EST. 1980 · 300+ PROJECTS`; below: single landscape image (HiBird night) inset cols 3–11, `aspect-ratio: 16/7`, arriving just below the fold so the first scroll is rewarded.

**Projects — Monograph Plates:** full-width alternating bands (image cols 1–7 / text 8–12, then reversed), separated by edge-to-edge hairlines. Text: index numeral (Fraunces, cantera), name, one italic sentence, meta rail.

**Portfolio index:** a full-page typographic LIST (not grid). Rows `Name — Typology — Municipality — Year`, hairline-separated, Fraunces names. Hover fades a large image into fixed right column. Filters = text links in meta caps, cantera underline when active.

**Project detail:** full-bleed hero → 3-line statement in lead → fact rail as two-column hairline dl → single-column images at varying widths with italic captions → prev/next as two large Fraunces names.

## 5. Motion — nothing moves that a printed page wouldn't

- Easing `cubic-bezier(0.16,1,0.3,1)` 900ms reveals; 240ms ease-out hovers. Two durations only.
- Reveal: opacity 0→1 + translateY(18px→0), stagger 70ms, cap 5 children. (IO threshold .15, rootMargin -12%.)
- Headline: line-by-line mask reveal (overflow hidden, span translateY(102%)→0, 1000ms, 120ms stagger), on load only.
- Hairline draw: scaleX(0→1) from left, 1100ms on entry.
- Image reveal: clip-path inset(0 0 100% 0)→0 + inner scale(1.06→1). Never fade-only.
- Hero parallax via `animation-timeline: view()` translateY(0→-6%), progressive enhancement.
- Hovers: rows shift padding-left 0→12px, name ink→cantera; images scale 1→1.03 over 700ms; underlines grow scaleX from left.
- View Transitions API for page transitions; project image as shared element.
- Reduced motion: opacity-only at 200ms.

## 6. Signature moments

**A. The Ledger** — a hairline-ruled table of the firm's real output (350+ gas stations, 300+ doc sets, 44 years, 10,000 seats, 200 beds, $90M+), tabular-numeral count-up 1200ms on entry. Most persuasive object on the page; contains no adjectives.

**B. The Flat File** — portfolio rows behave like a flat-file drawer: hovered row's baseline hairline gains 2px cantera; neighbors dim; fixed right-column image preview.

**C. The Colophon** — footer as genuine colophon in Newsreader italic: typefaces used, legal lineage (*Otero Ramos Arquitectos · Andrés Otero & Associates · Servicios Técnicos y Desarrollos · ArchiTechnika, Inc.*).

## 7. Puerto Rico — through material, name, and record

Cantera = burnt clay of tejas/stucco of Old San Juan. Bone = city-wall limestone at midday. **Municipality names always in Spanish, roman (never italic).** One Spanish sentence on landing, largest type in About: **"Arquitectura con propósito. Construida para perdurar."** — Spanish leads, English annotates in meta. Photography favors light/shadow over water.

## 8. Landing sections

§0 Nav (fixed, hairline, bone 92% + blur; name left; WORK · STUDIO · TEAM · CONTACT; phone number far right — *we answer*).
§1 Hero: "Architecture with purpose. / Built to endure." + meta line + HiBird image, caption "HiBird Hotel, Avenida Ashford, Condado."
§2 Statement (lead, cols 2–8): "For forty-four years we have designed the buildings Puerto Rico works in, heals in, competes in, and sleeps in. Hotels on Ashford. A two-hundred-bed hospital in Bayamón. A ten-thousand-seat coliseum. Three hundred and fifty gas stations. We are a boutique studio that has never been limited by its size — only sharpened by it." + marginalia rail.
§3 The Ledger (eyebrow: POR LOS NÚMEROS).
§4 Selected Work — 3 Monograph Plates (Normandie *"A 1942 ocean liner in concrete, brought back to sea."* / Bayamón Medical *"Two hundred beds, planned so that every one of them faces daylight."* / Raymond Dalmau *"Ten thousand seats, and the sightline from every one of them."*) + "View all projects →".
§5 Typologies — hairline list with counts + hover preview; kicker *"Any scale. The technology decides, not the headcount."*
§6 History teaser: "Four names. One practice." — 1980/1990/1995/2009 entries, dates in cantera.
§7 Team teaser: "Three principals. One hundred and twenty years of practice between them."
§8 Contact CTA: **"Bring us the difficult one."** — email at title size.
§9 Colophon footer.

---

# DIRECTION 02 — **HOJA 01**
### *("Sheet 01" — the first page of every construction document set Luis Tua has drawn since 1980)*

> **Concept:** The website is issued, not published — a live drawing set where the firm's forty-four years of technical rigor become the interface itself: title blocks, revision clouds, sheet numbers, dimension strings, and a grid you can actually see.

## 1. Emotional register / who it convinces

Precise, dry, confident, slyly funny — the deadpan wit of a very good engineer. Everything is *specified*. Convinces: GCs and CMs who have suffered bad drawing sets; developers who care about schedule and clash detection ("early Revit adopter in 1990s Puerto Rico" is an astonishing sentence); government procurement; other architects. **Core insight:** the firm's differentiator is that a boutique delivers hospitals and coliseums because its documentation and technology are institutional-grade. This direction makes that visible.

## 2. Typography

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display | **Archivo** (variable) | 500, 600, `wdth 62–100` | Headlines at `wdth 75`, UPPERCASE only at display size. |
| Text | **Archivo** | 400, 500 | Single-family system = a technical statement. |
| Mono | **DM Mono** | 300, 400, 500 | Carries ALL metadata — ~30% of visible text. |

Slashed-zero tabular numerals site-wide (`font-variant-numeric: tabular-nums slashed-zero`).

```
--t-sheet   : clamp(2.75rem, 7vw, 6.5rem)  /* Archivo 600, wdth 75, UPPERCASE */
--t-head    : 2rem                          /* Archivo 600, wdth 85, UPPERCASE */
--t-sub     : 1.375rem                      /* Archivo 500 */
--t-body    : 1rem
--t-anno    : 0.75rem                       /* DM Mono 400 — FIXED, never scales */
--t-tick    : 0.625rem                      /* DM Mono 500, caps */
```
Tracking: sheet `+0.005em`; head `+0.04em`; body `-0.006em`; mono `+0.06em`, uppercase labels / sentence-case values. Line-height: sheet `0.90`, head `1.0`, body `1.6`, mono `1.45`.

## 3. Color — blueprint-negative

```css
--sheet:     #FBFBF9;  --sheet-alt: #F1F1EE;
--graphite:  #1C1C1C;  --graphite-2:#6B6B68;
--grid:      #DEDEDA;  --grid-major:#C4C4BE;
--plot-red:  #D3301E;  /* revisions, deltas, active filters, required fields ONLY */
--cad-cyan:  #0F5F6E;  /* links, dimensions, hovers ONLY */
```
Dark ("PLOT: SCREEN"): `#0D1117 / #12181F / #E4E6E1 / #8A9099 / #1E2731 / #2A3541 / #FF6B54 / #4FD1E8`. Toggle labeled `PLOT: PAPER / SCREEN`.

Rules: **the construction grid is visible** — fixed 1px repeating grid @48px pitch, major every 5th, opacity .5, behind everything. Photography always inside title-block frames (1px border + mono caption bar: sheet number, scale, date) — never full-bleed. `--radius: 0` everywhere.

## 4. Layout logic

Explicitly DRAWN grid: rendered gridline verticals with circled letters Ⓐ Ⓑ Ⓒ atop sections, circled numerals down the left edge. Section padding `clamp(5rem, 8vw, 8rem)` — denser, organized.

**Persistent title block:** fixed 44px strip at viewport bottom, mono, cells like a real title block:
`│ ARCHITECHNIKA, INC. │ SAN JUAN, PR │ SHEET: A-100 HOME │ SCALE: NTS │ REV: 04 │ 2026-07-26 │`
`SHEET:` updates per route (A-100 HOME, A-200 WORK, A-201 NORMANDIE, A-900 CONTACT); `REV:` shows scroll depth.

**Hero — the cover sheet:** top-left lineage in mono; cols 1–7 display headline; cols 8–12 a **drawing index** (the primary nav!) with real dot leaders:
```
A-100  HOME
A-200  WORK ................ 300+ PROJECTS
A-300  STUDIO .............. 1980—2026
A-400  TEAM ................ 3 PRINCIPALS
A-900  CONTACT
```
Below: wide framed image (Normandie aerial) captioned `A-101 · NORMANDIE HOTEL · AERIAL · N.T.S.`

**Projects — dimensioned plates:** framed image + a real CSS **dimension string** beneath (`├──── 10,000 SEATS ────┤`, two flex hairlines + centered mono label) + mono spec block (TYPE/LOCATION/YEAR/STATUS/DELIVERY). Recently completed projects get a CSS **revision cloud** (scalloped border via radial-gradients) + `△4` delta. 

**Portfolio — the sheet schedule:** dense sortable mono table `SHEET │ PROJECT │ TYPE │ MUNICIPALITY │ YEAR │ SF │ STATUS`, zebra 2%. Filters are **CAD layer toggles**: `[✓] HOSPITALITY [ ] RESIDENTIAL`, active in plot-red; toggling off fades rows to 12% and collapses them (grid-template-rows 1fr→0fr) — like turning off a CAD layer. `LIST / THUMB` view switch.

**Project detail — the sheet set:** sheet-number sidebar (A-201 SITE / A-202 PLAN / A-203 PHOTOS), spec table, numbered mono scope list, prev/next as `◀ A-200` / `A-202 ▶`.

## 5. Motion — plotting

- Easing `cubic-bezier(0.22,1,0.36,1)` 700ms. No bounce ever.
- **Plot-in reveal:** every frame draws its own 1px border in 4 sequential edge steps (160ms each), then image fades in 500ms. Every image on the site draws its box before appearing.
- Grid shifts background-position-y -8px across full scroll (`animation-timeline: scroll()`).
- Mono text types in via `clip-path` with `steps(24)` timing (character-width jumps); sans text plain 120ms fade.
- Dimension strings: extension lines scaleX(0→1) from center 600ms, label fades +400ms.
- Hovers: instant (0ms) cad-cyan `outline` + offset 4px on frames — CAD selection is instantaneous. Schedule rows draw a cyan underline + `→ OPEN` affordance.
- Page transitions: View Transitions wipe with 2px plot-red leading edge — a plotter pen sweep.
- Title block REV increments crossing section boundaries with 180ms red flash.
- Reduced motion: everything instantly present.

## 6. Signature moments

**A. The Drawing Index nav** (hero) — navigate the site the way a contractor navigates a set.
**B. The Layer Panel filter** — with `ISOLATE` and `SHOW ALL LAYERS` reset.
**C. The Revision History timeline** (story page) — firm history as a revision table:
```
REV   DATE   DESCRIPTION                                  BY
△1    1980   ISSUED AS OTERO RAMOS ARQUITECTOS            AOS
△2    1990   REISSUED — ANDRÉS OTERO & ASSOCIATES         AOS
△3    1995   D.B.A. "ARCHITECHNIKA" ADDED                 AOS/AOJ
△4    2009   INCORPORATED — ARCHITECHNIKA, INC.           AOJ
```
Rows expand on click into era narratives with photos. (Bonus: a viewport-calibrated scale bar in the footer.)

## 7. Puerto Rico — jurisdiction, code, craft

Municipality names as mono location codes with real ZIPs (`LOC: SAN JUAN, PR 00907`). Real regulatory specs: `SEISMIC ZONE 3 · WIND: ASCE 7 CAT. IV · V(ult) 165 MPH` — a firm that designed a 200-bed hospital and a 10,000-seat coliseum on a hurricane-and-earthquake island has bragging rights no mainland firm has. **Project-distribution map as a survey plot:** single-color SVG Puerto Rico outline, plot-red crosshair ticks, mono legend, insets for USVI + `+ NEBRASKA · FLORIDA`. **Bilingual mono labels, Spanish first** (`ESCALA / SCALE`, `FECHA / DATE`, `HOJA / SHEET`) — PR drawing sets are genuinely bilingual; authentic to the deliverable.

## 8. Landing sections

§0 Nav: `ARCHITECHNIKA, INC.` + `A-200 WORK · A-300 STUDIO · A-400 TEAM · A-900 CONTACT` + `PLOT: PAPER ▾`. §0b fixed title block.
§1 Cover sheet: lineage line; "ARCHITECTURE / ROOTED IN PURPOSE, / SHAPED BY EXPERIENCE."; dimension-styled sub `├─ EST. 1980 ── 300+ PROJECTS ── PR · USA · USVI ─┤`; drawing index; framed Normandie aerial.
§2 Ⓐ THE METHOD: "COMBINING BROAD ARCHITECTURAL EXPERIENCE WITH TECHNICAL INNOVATION." + body ("We are a boutique studio that delivers institutional-scale work. That is not a contradiction — it is a technology decision we made early…") + three mono spec cards (01/MODEL Revit+BIM · 02/COORDINATE clash detection · 03/DOCUMENT 300+ sets since 1980).
§3 Ⓑ SELECTED SHEETS — 03 OF 300+: A-201 NORMANDIE (`├── 1942 STRUCTURE · FULL RESTORATION ──┤`, △4), A-202 BAYAMÓN MEDICAL (`├── 200 BEDS ──┤`), A-203 RAYMOND DALMAU (`├── 10,000 SEATS ──┤`).
§4 Ⓒ TYPOLOGY LEGEND — framed legend block with swatches, labels, counts, dot leaders.
§5 Ⓓ PROJECT DISTRIBUTION — the PR plot map. "THREE HUNDRED PROJECTS. ONE ISLAND, AND EVERYWHERE IT REACHES." + `+ 350 SERVICE STATION CONVERSIONS · ESSO / SHELL / TEXACO · ISLAND-WIDE · 1980—`.
§6 Ⓔ REVISION HISTORY teaser (4 rows).
§7 Ⓕ PERSONNEL — three framed portraits with mono credential blocks; initials AOS/AOJ/LIT as `DRAWN BY` initials.
§8 Ⓖ ISSUE FOR REVIEW — "SEND US THE PROGRAM." Framed form, bilingual mono labels, plot-red required asterisks, submit `[ ISSUE ▸ ]` + mono contact block.

---

# DIRECTION 03 — **BRISA**
### *("Breeze" — the trade wind that has determined how buildings are oriented on this island for four hundred years)*

> **Concept:** Caribbean modernism as a *light* problem, not a color problem — a site built from the long horizontal band, the deep shadow, and the hour-by-hour warmth of Atlantic light, where every project is presented the way you actually experience a building here: from the terrace, at the right time of day.

## 1. Emotional register / who it convinces

Warm, generous, atmospheric, *slow* — a **film**. The twenty minutes before sunset on a Condado terrace. Convinces: hospitality developers and hotel brands (buying an experience); luxury residential (buying a life); anyone choosing between Architechnika and a Miami/NY firm — *being here* is the qualification; press and awards juries.

**Never:** turquoise gradients, palm-leaf patterns, hibiscus, script fonts, sunset-orange CTA buttons. Rule: **if it could appear on a rum bottle, it's out.**

## 2. Typography

| Role | Face | Weights | Notes |
|---|---|---|---|
| Display | **Instrument Serif** | 400 + italic | Used enormous. The italic carries ALL Spanish text. |
| Text | **Figtree** | 300, 400, 500 | Warm humanist; 300 at large sizes is lovely. |
| *(No mono — deliberate.)* | | | |

```
--t-cinema  : clamp(4rem, 13vw, 15rem)
--t-title   : clamp(2.25rem, 5vw, 4.5rem)
--t-lead    : clamp(1.375rem, 2vw, 1.875rem)  /* Figtree 300 */
--t-body    : 1.0625rem
--t-label   : 0.75rem                          /* Figtree 500 caps */
```
Tracking: cinema `-0.045em`; title `-0.03em`; lead `+0.002em`; labels `+0.18em`. Line-height: cinema `0.88`, title `1.0`, lead `1.55`, body `1.7`. **All Spanish in Instrument Serif italic, any size, any context** — a second voice, not a translation.

## 3. Color — warm dark by default; light comes from the photographs

```css
--noche:     #14100D;  /* warm near-black, brown-cast */
--noche-2:   #1D1814;
--arena:     #EDE4D6;  /* warm sand text */
--arena-dim: #A2978A;
--rule:      #322A23;
--sol:       #E0813C;  /* late-afternoon sun on stucco */
--mar:       #1E5F63;  /* Atlantic at depth — sparing */
```
Light mode ("día"): `#FAF6EF / #F2EBE0 / #1A1512 / #6E645A / #E2D8C9 / #C25F1C / #17494D`. Toggle reads `DÍA / NOCHE`. Both modes = same place, different hours.

Rules: photography IS the color system — never desaturated or duotoned. `--sol` only as: scroll-progress line, active nav dot, "now viewing" index, link hover. Never a button fill; buttons are 1px arena-outline pills filling to arena on hover. **One permitted gradient** (the Golden Hour scrim): `linear-gradient(180deg, transparent 0%, rgba(20,16,13,.55) 55%, var(--noche) 100%)` — used exactly twice (hero base, footer top).

## 4. Layout logic

**Horizon-band system:** full-width horizontal bands like stacked slabs and shaded terraces: `FULL-BLEED IMAGE (100vh) → TEXT BAND → SPLIT BAND (60/40) → BREATH (empty, 12vh) → …`. **BREATH is a named primitive:** pure noche, nothing in it, `clamp(6rem, 12vh, 10rem)`. Content sits LOW in its band (more space above than below) — settling, like heat.

**Hero — the Hour:** full-viewport image (HiBird night / Normandie aerial) + golden-hour scrim. Cinema headline at the **lower third**, left, cols 1–6. Above it, label in sol: `SAN JUAN, PUERTO RICO · 18.4655° N, 66.1057° W`. Bottom-right: live element `6:47 PM AST · atardecer` (real PR time + Spanish day-moment). No scroll indicator.

**Projects — the Passage:** full-viewport image panels stacked; each title in cinema type is `position: sticky` while its image scrolls; the next panel's arrival releases it. Chapter cards in a film. Native scroll, zero scroll-jacking. Beneath the pinned title, one line: `Hospitality · Condado, San Juan · Restoration & Conversion`. That's the whole card.

**Portfolio — the Contact Sheet:** CSS-columns masonry, natural aspect ratios, no crops. Titles on hover over a scrim (always faintly visible on touch). Filter = a row of Instrument Serif italic words — `todos · hospitality · residential …` — **the active one becomes upright roman in sol.** Filtering changes the letterform. That's the whole interaction.

**Project detail — the Walkthrough:** arrival image full-bleed → name in cinema on noche → short warm essay (first-person-plural) in lead → long image sequence at varying scales with generous space → facts in a quiet band at the BOTTOM → `Next: [Project]` in title over its own image.

## 5. Motion — everything drifts; nothing snaps

- Easing `cubic-bezier(0.19,1,0.22,1)` 1200ms reveals; hovers 500ms (slow — the tonal opposite of Hoja).
- Reveal: opacity + translateY(48px→0) + `blur(6px)→0`. The blur makes it atmospheric. Stagger 140ms.
- Passage: sticky top 38vh; enhanced fade-out in last 20% via `animation-timeline: view()`.
- Image scale drift: full-bleeds scale(1.08→1) tied to `view()` across visible range.
- Cinema entrance: per-WORD blur-and-rise (`blur(12px) translateY(28px)` → 0), 1400ms, 90ms stagger. Words, not characters.
- Contact sheet hover: hovered image brightens/saturates over 600ms; ALL others dim to .45 via container `:has()` — the grid responds to attention.
- Nav: transparent over hero → noche-2 + blur(20px) after 100vh (IO sentinel).
- Scroll progress: 2px sol line, `animation-timeline: scroll()`, no JS.
- Page transitions: View Transitions cross-dissolve + scale (film cut, not a wipe); shared-element project images.
- Reduced motion: opacity-only 250ms; sticky remains (sticky is not motion).

## 6. Signature moments

**A. La Hora — the site knows what time it is in San Juan.** Hero corner + footer: current AST time + Spanish day-moment (`amanecer / mañana / mediodía / tarde / atardecer / noche`). The hero **crossfades between day and night photography of the same building** by actual PR hour. `Intl.DateTimeFormat` with `timeZone: 'America/Puerto_Rico'`; decided at first paint, no CLS. The site is *somewhere*, and it's not where you are.

**B. The Trade Wind marquee** — edge-to-edge slow marquee (~70s/cycle, right-to-left — the trade winds' direction) of every municipality built in, Instrument Serif italic at title size, sol diamonds between: *San Juan ◆ Condado ◆ Bayamón ◆ Vega Baja ◆ Aguada ◆ Quebradillas ◆ Dorado ◆ Loíza …* Pauses on hover; reduced-motion renders a static wrapped list.

**C. Terrace crops** — a few images cropped to `aspect-ratio: 21/9`, inset with generous margins: a view framed by a deep terrace overhang — THE defining move of Caribbean modernism. Short italic caption hanging in the left margin. 2–3 per page max.

## 7. Puerto Rico — the strictest guardrails, the biggest payoff

Time zone, not palm trees. Coordinates in the hero. Spanish as a second voice in italic (`atardecer`, `todos`, `Nuestra Historia`) — meaning inferable from position. Light as the subject (dark-first palette + day/night swap = the firm designs for a specific quality of light). Trade-wind orientation logic stated once, plainly, in the intro. Banned: turquoise, palm silhouettes, hibiscus, waves, script fonts, "paradise," "vibrant."

## 8. Landing sections

§0 Nav (transparent → blurred noche-2 after 100vh).
§1 Hero 100vh, day/night aware: label with coordinates; "**Designing high-performance / spaces that shape cities / *y elevan la vida diaria.***" (third line flips to Spanish italic mid-sentence — the single best typographic move available; used nowhere else); lead: "Forty-four years of architecture on this island and everywhere it reaches."; corner La Hora.
§2 BREATH.
§3 Intro (LA FIRMA): "Architecture with purpose. Built to endure." + trade-wind copy + *"Combinamos amplia experiencia arquitectónica con innovación técnica."*
§4 The Passage: Normandie / HiBird / Casa Metropolitana. Closing: "Three hundred more →".
§5 Trade Wind marquee (label: DONDE HEMOS CONSTRUIDO).
§6 Typologies contact-sheet preview (6 images, hover-dim): "Hotels, hospitals, coliseums, and houses. *Any scale. That has always been the point.*"
§7 BREATH.
§8 History teaser (terrace crop): "**We have changed our name four times. / We have never changed the address.**" + the four names.
§9 Team teaser (LOS PRINCIPALES): Otero Sr. — *El Fundador*; Otero Jr. — *El Innovador*; Tua — *El Técnico*.
§10 Contact CTA (full-bleed band, scrim, low text): "**Let's talk about the site.** / ***Hablemos.***" + email/phone + mirrored La Hora.

---

## Cross-direction implementation notes

- One Next.js App Router site. **Engineering decision (Fable): each direction is a route subtree** — `/cantera`, `/hoja`, `/brisa` — with its own `layout.tsx` (fonts, nav, footer, theme CSS) and page components, sharing only `src/data/content.ts` and the floating `StyleSwitcher`. Root `/` is a minimal chooser. This keeps the three DOMs honest (they are structurally different, not re-skins).
- Fonts via `next/font/google`, subset `latin` + `latin-ext` (ó í ñ á), loaded per-direction layout only.
- Hero images: `next/image` with `priority`, explicit sizes. All imagery under `/images/full/*` and `/images/thumb/*`.
- No animation libraries, no scroll listeners: IntersectionObserver, CSS scroll-driven animations (progressive enhancement), `position: sticky`, View Transitions API.
- Full `prefers-reduced-motion` fallbacks in all three.
- Contrast: AAA body text in Cantera/Hoja; Brisa arena-on-noche 12.1:1; text over imagery always on a ≥4.5:1 scrim.
- Accessibility: filters need `aria-pressed` + visually-hidden live region announcing result counts.

**Opus's recommendation if forced to choose:** HOJA 01 is the most defensible and differentiated; BRISA wins the most hospitality work; CANTERA is the safest and ages longest.
