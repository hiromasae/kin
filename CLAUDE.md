# Kin — Personal Relationship Manager

## Project Overview

Kin is a minimal, warm web app that helps people maintain meaningful professional relationships by reminding them to reach out on a cadence they set. It is not a CRM. It is not a sales tool. It is a quiet, personal system for staying human with the people who matter to you professionally.

### Core Loop

1. **Add a contact** — name, role, context about the relationship
2. **Set a cadence** — weekly, biweekly, monthly, or quarterly
3. **Get notified** — when the cadence lapses, a reminder surfaces
4. **Log an interaction** — short note about what you talked about
5. **Draft outreach** — AI generates a message based on your history with that person

---

## Color Palette

All custom colors are defined in `tailwind.config.ts` under `theme.extend.colors`.

```ts
colors: {
  stone: {
    // Override default Tailwind stone with warmer values
    50:  '#faf9f7',
    100: '#f3f0eb',
    200: '#e8e2d9',
    300: '#d6ccbf',
    400: '#b8a99a',
    500: '#9a8778',
    600: '#7d6c5e',
    700: '#63544a',
    800: '#4a3e37',
    900: '#332b26',
    950: '#1e1812',
  },
  sand: {
    50:  '#fdfcfa',
    100: '#f7f4ee',
    200: '#ede7db',
    300: '#ddd4c4',
    400: '#c8baa8',
    500: '#b09d8a',
  },
  ink: {
    DEFAULT: '#1e1812',  // primary text
    muted:   '#6b5f57',  // secondary text
    faint:   '#a89d97',  // placeholder, disabled
  },
  accent: {
    DEFAULT: '#c4622d',  // warm terracotta — CTAs, active states
    hover:   '#a84f22',
    light:   '#f5e8df',  // accent backgrounds, badges
  },
  surface: {
    base:    '#fdfcfa',  // page background
    raised:  '#ffffff',  // cards
    sunken:  '#f3f0eb',  // inputs, wells
    border:  '#e8e2d9',  // dividers, card borders
  },
}
```

**Guiding principle:** The palette should feel like warm paper — off-whites, stone tones, one terracotta accent. No blues, no grays that feel corporate.

---

## Typography

Font stack defined in `tailwind.config.ts` and loaded via `next/font`.

```ts
fontFamily: {
  sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-geist-mono)', 'monospace'],
}
```

### Scale

| Token       | Size  | Weight | Usage                              |
|-------------|-------|--------|------------------------------------|
| `text-xs`   | 12px  | 400    | Labels, badges, metadata           |
| `text-sm`   | 14px  | 400    | Body copy, secondary content       |
| `text-base` | 16px  | 400    | Primary body text                  |
| `text-lg`   | 18px  | 500    | Card titles, section headers       |
| `text-xl`   | 20px  | 500    | Page section headings              |
| `text-2xl`  | 24px  | 600    | Page titles                        |
| `text-3xl`  | 30px  | 600    | Hero / empty state headings        |

- **Line height:** `leading-relaxed` (1.625) for body, `leading-snug` (1.375) for headings
- **Letter spacing:** default for body, `tracking-tight` for large headings
- **Never use** font weights above 600. No heavy/black weights.

---

## Spacing Conventions

Use Tailwind's default spacing scale. These are the values used at each layout level:

| Context              | Value      |
|----------------------|------------|
| Page horizontal pad  | `px-6` / `px-8` (responsive) |
| Section gap (y-axis) | `gap-8` or `space-y-8`      |
| Card internal pad    | `p-5` or `p-6`              |
| Between card items   | `gap-3` or `space-y-3`      |
| Inline element gap   | `gap-2`                     |
| Button padding       | `px-4 py-2` (default) / `px-3 py-1.5` (small) |

**Max content width:** `max-w-2xl` for single-column content, `max-w-4xl` for split layouts. Never go full-bleed on wide screens.

---

## Component Conventions

### Cards

Cards are the primary unit of the UI — contacts live in cards, interactions live in cards.

- Background: `bg-surface-raised` (`#ffffff`)
- Border: `border border-surface-border` with `rounded-2xl`
- Shadow: `shadow-sm` — never heavy shadows
- Hover state: `hover:shadow-md transition-shadow duration-150`
- No header bars, no colored tops, no chrome — just content with padding

```
bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow
```

### Buttons

Three variants only:

**Primary** — for the single most important action on a page
```
bg-accent text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors
```

**Secondary** — for supporting actions
```
bg-surface-sunken text-ink border border-surface-border rounded-xl px-4 py-2 text-sm font-medium hover:bg-stone-200 transition-colors
```

**Ghost** — for subtle/destructive/low-priority actions
```
text-ink-muted rounded-xl px-4 py-2 text-sm font-medium hover:bg-surface-sunken hover:text-ink transition-colors
```

- Never use `rounded-full` pill buttons — `rounded-xl` is the standard
- Icon buttons use `rounded-lg` with equal padding (`p-2`)
- No gradients, no shadows on buttons

### Inputs

```
bg-surface-sunken border border-surface-border rounded-xl px-3 py-2 text-sm text-ink
placeholder:text-ink-faint
focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50
transition-colors
```

- Labels sit above the input, `text-sm font-medium text-ink-muted mb-1`
- Validation errors appear below in `text-xs text-red-600 mt-1`
- Never use floating labels

### Lists / Contact List

- Contacts render as a vertical list of cards with `space-y-3`
- Each card shows: name, role/company, cadence badge, days since last contact, last interaction note snippet
- Overdue contacts surface at the top, visually distinct with a subtle `bg-accent-light` tint on the card
- No tables — everything is cards or flex rows

### Badges / Tags

```
text-xs font-medium rounded-full px-2.5 py-0.5
```

Cadence: `bg-stone-100 text-stone-700`
Overdue: `bg-accent-light text-accent`
Status: contextual

### Empty States

Warm, encouraging, never clinical. Use a short headline + one sentence + optional CTA. No sad illustrations of empty boxes.

---

## File and Folder Structure

```
/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth routes (login, signup)
│   ├── (app)/                  # Authenticated app shell
│   │   ├── layout.tsx          # App shell with nav
│   │   ├── page.tsx            # Dashboard / contact list
│   │   ├── contacts/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # Contact detail view
│   │   │   └── new/
│   │   │       └── page.tsx    # Add contact form
│   │   └── settings/
│   │       └── page.tsx
│   ├── api/
│   │   ├── contacts/           # Contact CRUD
│   │   ├── interactions/       # Log interactions
│   │   └── ai/
│   │       └── draft/          # AI message drafting
│   ├── layout.tsx              # Root layout
│   └── globals.css
├── components/
│   ├── ui/                     # Primitives (Button, Input, Badge, Card)
│   ├── contacts/               # Contact-specific components
│   ├── interactions/           # Interaction log components
│   └── shared/                 # Nav, layout shells, empty states
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── anthropic.ts            # Anthropic client + prompt helpers
│   └── utils.ts                # cn(), date helpers, cadence logic
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript types and interfaces
├── tailwind.config.ts
├── CLAUDE.md
└── .env.local
```

---

## Data Model

### Contact

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `user_id` | `uuid` | FK → auth.users |
| `name` | `text` | |
| `role` | `text` | |
| `company` | `text` | |
| `context` | `text` | Free text about the relationship |
| `cadence` | `enum` | `weekly` \| `biweekly` \| `monthly` \| `quarterly` |
| `created_at` | `timestamptz` | |

### Interaction

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `contact_id` | `uuid` | FK → contacts |
| `user_id` | `uuid` | FK → auth.users |
| `note` | `text` | Short text |
| `interacted_at` | `timestamptz` | When the interaction happened |
| `created_at` | `timestamptz` | When the record was created |

---

## Coding Conventions

### Naming

- **Components:** PascalCase (`ContactCard.tsx`, `InteractionLog.tsx`)
- **Hooks:** camelCase prefixed with `use` (`useContacts.ts`, `useDraftMessage.ts`)
- **Utilities:** camelCase (`formatCadence.ts`, `daysSinceContact.ts`)
- **Types:** PascalCase interfaces (`Contact`, `Interaction`, `CadenceType`)
- **API routes:** lowercase with hyphens in URL, camelCase in handler functions

### Component Organization

Each component file follows this order:
1. Imports
2. Types / interfaces local to this component
3. The component function (default export)
4. Sub-components or helpers used only here (non-exported)

Keep components focused. If a component needs more than ~120 lines, split it.

### Server vs. Client Components

- Default to **Server Components** — fetch data at the route level, pass down as props
- Use `'use client'` only when you need interactivity: forms, modals, hover states, hooks
- Data fetching happens in route `page.tsx` files or dedicated `loader` functions — not inside leaf components

### Data Layer

- Supabase queries live in `lib/supabase/` helper functions, not scattered in components
- Row Level Security (RLS) is enforced at the database level — never skip it
- Use Supabase server client in Server Components and API routes; browser client only for real-time subscriptions

### AI Integration

- All Anthropic API calls go through `lib/anthropic.ts`
- Prompts are defined as named template functions, not inline strings
- Always stream responses where the UI benefits from it
- Include the full interaction history in the context window for drafting — that's the product's core value

---

## Surface Texture and Depth

Kin uses two subtle effects to give the UI a tactile, warm quality inspired by Craft.

### Glassmorphism

Applied to overlays, modals, sidebars, and floating elements only. Base cards stay solid white. Glass is reserved for layered UI.

```css
background: rgba(253, 252, 250, 0.72);
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(232, 226, 217, 0.6);
```

### Grain Texture

A subtle SVG noise overlay applied globally via a pseudo-element on the root `body` in `globals.css`. Opacity between `0.03` and `0.04` — never above `0.05`. Should be felt, not seen.

---

## What to Avoid

### Visually

- **No blues or purples** — the palette is warm; blues make it feel like a SaaS dashboard
- **No heavy shadows** — `shadow-sm` maximum on cards; the UI should feel light
- **No gradients** — flat colors only
- **No rounded-full on buttons** — pill shapes feel like a different product
- **No colored header bars on cards** — no Notion-style covers, no colored accents on card tops
- **No dense information** — more whitespace, fewer things per card
- **No tables** — lists of cards only
- **No dark mode** — not in scope; ship the warm light theme first

### Technically

- **No ORM** — use Supabase's query builder directly
- **No Redux / Zustand** — React state + server state (SWR or React Query if needed, but prefer server fetching)
- **No `any` types** — TypeScript must be strict
- **No inline styles** — Tailwind classes only; no `style={{}}` except for truly dynamic values (e.g. widths from JS)
- **No `useEffect` for data fetching** — use Server Components or React Query
- **No premature abstraction** — don't build a component library until you have three real use cases for it
- **No feature flags** — build it, ship it, or don't build it
