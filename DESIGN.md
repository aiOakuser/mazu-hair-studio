# mazu Hair Studio — Design Spec

Visual system and component breakdown, derived from the reference template.
Roadmap and feature scope live in [PLAN.md](./PLAN.md).

> Colors below are read visually from the reference image, not
> color-picked — treat hex values as close approximations and confirm
> against brand assets (or the source file) before finalizing.

---

## 1. Visual language

**Overall feel**: minimal, editorial, black-and-white with a single warm
accent. Generous white space, thin hairline borders, no drop shadows or
rounded-pill buttons — everything reads as flat, high-contrast, boutique.

### Color palette

| Token                  | Approx. value                    | Usage                                        |
| ---------------------- | -------------------------------- | -------------------------------------------- |
| `color/bg`             | `#FFFFFF`                        | Page background                              |
| `color/ink`            | `#111111`                        | Headings, service names, primary button fill |
| `color/ink-on-fill`    | `#FFFFFF`                        | Text on the black "Book" button              |
| `color/text-secondary` | `#666666`                        | Descriptions, info-bar text, hours           |
| `color/border`         | `#E5E5E5`                        | Card borders, dividers, outlined button      |
| `color/accent`         | `#B5432B` (warm rust/terracotta) | "Book now" links, "Get directions" link      |
| `color/link-hover`     | darken accent ~10%               | Hover state on accent links                  |

### Typography

- **Logotype** ("mazu Hair Studio" in the header): a refined serif or
  small-caps serif, distinct from body copy — treat as a display/brand
  font, set once in the header, not reused elsewhere.
- **Body / UI**: clean system sans-serif (e.g. `system-ui`, `Inter`, or
  `Helvetica Neue` fallback stack). Used for everything else: nav, info bar,
  card titles, prices, hours table.
- **Scale** (approximate):
  - Section headers ("Service menu", "Location & Hours"): 20–22px / semibold
  - Card title: 15–16px / semibold
  - Body/description/price: 13–14px / regular
  - Meta (duration, info bar): 12–13px / regular, secondary color

### Spacing & grid

- Page content max-width ~1100–1200px, centered, with consistent side
  gutters (~24px mobile, ~40px+ desktop).
- Service grid: 2 columns desktop, 1 column mobile, column gap ≈ row gap
  ≈ 16–20px.
- Card internal padding ≈ 16–20px.
- Hairline `1px solid border` around each card; no shadow, no radius (or a
  very small 2–4px radius — reference shows near-square corners).

---

## 2. Page structure

```
┌───────────────────────────────────────────────────────────┐
│                     mazu Hair Studio            👤  🛒    │  Header
├───────────────────────────────────────────────────────────┤
│ Service menu                                    [Book]     │  Section title
│ Open until 6pm • phone • email             [My bookings]   │  + Business info
│ mazu Hair Studio • address                                 │  + CTAs
├───────────────────────────────────────────────────────────┤
│ Services   Staff                                            │  Tabs
├───────────────────────────────────────────────────────────┤
│ ┌───────────────────┐  ┌───────────────────┐               │
│ │ Service card       │  │ Service card       │   ...        │  2-col grid
│ └───────────────────┘  └───────────────────┘               │
│  ... (repeats ~17 rows) ...                                 │
├───────────────────────────────────────────────────────────┤
│  [Map]           Location & Hours        Mon  Closed        │
│                   Address / phone /       Tue  10–6         │  Footer
│                   email / Get directions  ...                │
│                                            Sun  Closed        │
└───────────────────────────────────────────────────────────┘
```

Mobile: header stays centered; info bar + CTAs stack vertically; tabs stay
horizontal; grid collapses to 1 column; footer stacks map → info → hours.

---

## 3. Component inventory

### `Header`

- Centered logo/wordmark (link to home).
- Right-aligned icon cluster: account (auth/profile entry point), cart
  (in-progress multi-service booking count badge when non-empty).

### `BusinessInfoBar`

- Line 1: open/closed status + phone (`tel:` link) + email (`mailto:` link),
  separated by `•`.
- Line 2: business name + address.
- Props: `{ isOpen, closesAt, phone, email, businessName, address }`

### `PrimaryButton` ("Book")

- Filled black background, white text, square corners, no border.
- Full-bleed width on mobile stacked layout.

### `SecondaryButton` ("My bookings")

- White background, black 1px border, black text. Same size as primary.

### `TabNav`

- Two (extendable to N) text tabs: `Services`, `Staff`.
- Active tab: underline or bold weight + ink color; inactive: secondary
  gray, no underline.

### `ServiceCard`

- Fields: `name`, `priceLabel` (freeform string: `"$80 – $120"`,
  `"$330–"`, `"$150 & up"`), `description?` (optional, 2–3 line clamp),
  `durationLabel?` (`"1hr"`, `"3hrs 30 mins"`, or absent → show
  `"Price Varies"`), `priceValueLabel` (canonical restated price, bottom
  right, e.g. `"$80.00"`), `ctaLabel = "Book now"`, `ctaHref`.
- Layout: title top, price under title, description under price (if any),
  then a bottom row split left (accent "Book now" link) / right
  (`priceValueLabel • durationLabel`).
- Whole card is not a single click target — only the title and "Book now"
  are interactive, to avoid ambiguity with text selection.
- Hover: subtle border darken or background tint (`#FAFAFA`); "Book now"
  underlines or shifts to `link-hover` color.

### `ServiceGrid`

- CSS grid, `grid-template-columns: repeat(2, 1fr)` desktop, `1fr` mobile.
- Renders `ServiceCard` per item; no pagination visible — full catalog on
  one page (fine at ~34 items; revisit if catalog grows much larger).

### `LocationMap`

- Embedded map (iframe or static image with pin), single location marker.
- Needs a text fallback (already covered — address is rendered as text
  alongside it, so the map itself can be `aria-hidden` / decorative).

### `HoursTable`

- 7 rows, `Day` / `Hours` two-column layout, `Closed` shown for closed days.
- Props: `{ hours: { day: string; open?: string; close?: string }[] }`

### `LocationFooter`

- Composes `LocationMap` + business contact block (+ "Get directions" accent
  link, deep-linking to a maps app/URL) + `HoursTable`.

---

## 4. States & edge cases

- **No description**: card omits the description block entirely (don't
  reserve empty space) — visible in the reference (e.g. "mazu's Men's
  Haircut" has no description line while "Japanese head spa" does).
- **Price-varies services**: show `"Price Varies"` in place of a duration,
  e.g. "Shampoo & blow dry".
- **Long descriptions**: clamp to ~3 lines with `…` (seen on "Hair
  treatment (Milbon…)", "Partial highlights & trim with short hair", etc.).
- **Closed day** in hours table: render "Closed" instead of a time range.
- **Empty cart / no active booking**: cart icon shows no badge.
- **Staff tab with no data yet**: show an empty/coming-soon state rather
  than an empty grid.

## 5. Accessibility notes

- "Book now" and "Book"/"My bookings" must be real `<a>`/`<button>`
  elements — not styled `<div>`s — for keyboard and screen-reader access.
- Accent rust-red on white needs a contrast check (WCAG AA, 4.5:1 for
  normal text) before finalizing the exact hex.
- Tabs (`Services`/`Staff`) should use proper ARIA tab roles
  (`role="tablist"`/`"tab"`/`"tabpanel"`) since they swap page content.
- Map block should have accessible/decorative treatment since the same
  info is duplicated as text nearby.
