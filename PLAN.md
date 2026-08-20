# mazu Hair Studio — Project Plan

A booking/service-menu website for a single-location hair salon (mazu Hair
Studio, San Jose CA). The reference template is a service-catalog booking
page: business info, a tabbed Services/Staff view, a scrollable grid of
bookable services, and a Location & Hours footer with an embedded map.

This document analyzes the reference template and lays out a build roadmap.
The visual/component spec lives in [DESIGN.md](./DESIGN.md).

> Assumption: no existing codebase or stack was found in this directory, so
> this plan assumes a fresh build on **Next.js + React + TypeScript +
> Tailwind CSS**, deployed as a static/SSR site. Swap freely — nothing here
> is stack-locked except where noted.

---

## 1. Template analysis

Reading the reference screenshot region by region:

### A · Header

- Centered wordmark "mazu Hair Studio" (serif/script-leaning logotype,
  distinct from the body sans-serif).
- Top-right: account icon + cart icon (a "cart" suggests multi-service
  booking — add several services, then check out as one booking).

### B · Business info bar

- Left-aligned single line: open/closed status ("Open until 6:00 pm"),
  phone, email — separated by `•`.
- Second line: business name + full address.
- Right-aligned action pair: **Book** (primary, filled black) and
  **My bookings** (secondary, outlined) — the latter implies some form of
  customer identity/lookup (email or account) to retrieve past bookings.

### C · Tab navigation

- **Services** / **Staff** tabs. Services is the default view (this
  screenshot). Staff presumably lists stylists, each bookable individually —
  same underlying service catalog, filtered/grouped by staff member instead
  of by service.

### D · Service grid

- 2-column responsive grid (collapses to 1 column on narrow viewports —
  standard behavior for this card count and density).
- Each **service card** contains:
  - Service name (bold, acts as a link/click target)
  - Price — either a single value (`$150`), a range (`$80 – $120`), or a
    "starting at" value (`$330–`, `$150 & up`)
  - Optional 1–3 line description (present on ~40% of cards; longer service
    descriptions get truncated with `…`)
  - "Book now" link in an accent color (warm red/rust), bottom-left
  - Price + duration restated bottom-right (`$80.00 • 1hr`) — this is
    likely the canonical, authoritative price/duration display; the price
    text near the title may be a looser human-entered summary
  - Cards with no fixed duration show "Price Varies" instead of a duration
- ~34 services visible, spanning: cuts (women's/men's/children's), color
  (balayage, highlights, root touch-up, toner, bleach), texture (perms,
  Japanese straightening, digital perm), treatments (keratin, Japanese head
  spa, Milbon/IonPlex), and add-ons (blow dry, bang trim, shampoo & blow
  dry).

### E · Location & Hours footer

- Left: embedded map with a single pin (static or interactive, e.g. Google
  Maps embed).
- Middle: business name, address, phone, email, and a "Get directions" link
  (accent color, likely deep-links to Maps/Directions).
- Right: a 7-row weekly hours table (Mon closed, Tue–Sat with hours, Sun
  closed).

### Inferred data model

The page is clearly rendered from structured data, not hand-authored HTML.
Minimum shape:

```
Business { name, phone, email, address, hours[7], mapCoords }
Service  { id, name, priceLabel, priceMin?, priceMax?, description?,
           durationMinutes?, staffIds[]? }
Staff    { id, name, photo?, serviceIds[] }
Booking  { customer, serviceIds[], staffId?, datetime, status }
```

---

## 2. Feature breakdown

| #   | Feature                                                      | Priority    | Notes                                                             |
| --- | ------------------------------------------------------------ | ----------- | ----------------------------------------------------------------- |
| 1   | Static service catalog page (header, info bar, service grid) | MVP         | No booking logic yet — read-only listing                          |
| 2   | Location & Hours footer with map embed                       | MVP         | Map can start as a static image/iframe embed                      |
| 3   | Services / Staff tab switch                                  | MVP         | Staff view can reuse the same card component, grouped differently |
| 4   | Responsive layout (1-col mobile, 2-col desktop)              | MVP         |                                                                   |
| 5   | "Book now" → booking flow (date/time/staff picker)           | Post-MVP    | Biggest scope item; see §4                                        |
| 6   | "Book" / cart — multi-service selection before checkout      | Post-MVP    | Depends on #5                                                     |
| 7   | "My bookings" — lookup/manage existing bookings              | Post-MVP    | Needs customer identity (email/phone verification at minimum)     |
| 8   | Admin/CMS for editing services, prices, hours                | Post-MVP    | Could be a simple hand-edited JSON/CMS collection at first        |
| 9   | SEO (title/meta, local business structured data)             | Should-have | Local-business schema.org markup for the footer info              |
| 10  | Accessibility pass (contrast, focus states, map alt)         | Should-have |                                                                   |

## 3. MVP scope line

The **true MVP** is a static, read-only version of exactly what's in the
screenshot: header, info bar, tab UI (Services tab functional, Staff tab can
be a stub), service grid rendered from a local data file, and the
Location & Hours footer. No real booking transaction yet — "Book now" and
"Book" can initially deep-link to an external booking provider (Square
Appointments, Fresha, Calendly-for-services, etc.) or open a placeholder
modal, so the site is usable/launchable before the in-house booking engine
exists.

## 4. Booking flow (post-MVP) — two paths

- **Path A — embed a booking provider.** Point "Book now" at an existing
  scheduling product (Square Appointments, Fresha, Booksy, Acuity). Fastest
  to ship, but the service catalog then has to stay in sync with two
  places (this page + the provider's own catalog).
- **Path B — build it in-house.** Own the whole flow: service/staff select
  → available time slots → customer details → confirmation, backed by a
  real calendar (staff availability, buffer times, no-double-booking).
  Bigger investment; needed only if per-provider fees or catalog duplication
  become a real problem.

Recommendation: ship MVP with Path A (or a "call/email to book" fallback),
revisit Path B once there's usage data.

## 5. Roadmap

1. **Static catalog page** — layout, data file, service grid, responsive
   breakpoints (matches DESIGN.md component specs).
2. **Location & Hours footer**, incl. map embed.
3. **Staff tab** (can ship as "coming soon" if staff data isn't ready).
4. **Wire "Book now" / "Book"** to chosen booking path (§4).
5. **SEO + local-business structured data** + basic analytics.
6. **"My bookings"** lookup (only once a booking system exists to look up).
7. **Admin editing** for services/hours (only once content changes often
   enough to justify it).

## 6. Non-functional requirements

- **Performance**: this is a content-heavy, mostly-static page — should be
  fully static-generated (SSG) with no client JS required for the initial
  render of the catalog.
- **Accessibility**: card CTAs need real link/button semantics (not
  div-onclick), color contrast on the accent red against white, map needs a
  text alternative (address is already present as text, which covers this).
- **Mobile-first**: given salon customers frequently book from a phone, the
  1-column mobile layout and tap-target sizing on "Book now" matter more
  than desktop polish.
