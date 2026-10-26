# Belia Connect — Concept 02

The selected direction keeps Concept 02's white navigation, forest-green hero and lime calls to action. Following owner feedback, the hero now uses a typographic graphic of the three program pillars. Category and program cards use icons, typography and metadata, without stock or generated photographs of people. Real activity photographs may be introduced when supplied by the owner.

## Program taxonomy
- Networking: introductions, professional relationships and collaboration.
- Pembangunan: learning, skills, careers and personal development.
- CSR: volunteering, community service and social contribution.

Each Program requires one primary category. Opportunities remain a separate content type. Existing records keep a null category until an administrator categorizes them; the migration does not guess their category.

## Assets
- `public/logo.png`: original logo supplied by the owner, preserved unchanged.
- `public/brand-mark.svg`: simplified vector rendition of the linked people / BC symbol for small header and footer use. Uses the original green and white identity on a dark-green rounded tile; no CSS crop or color filter.
- `public/favicon.svg`, `favicon.ico`, `favicon-32.png` and `apple-touch-icon.png`: matching small-size browser and iPhone assets. Metadata uses versioned URLs to refresh cached icons.
- The earlier illustrative community photograph is no longer used by the website. No photographs of random people appear in hero or cards.
- Cards use Lucide icons and category-specific accent colors with program text, dates, location and links where provided.

## Validation
Run `pnpm exec tsc --noEmit`, `pnpm build`, and `node scripts/test-program-categories.mjs`.
The category integration test uses an isolated in-memory D1 database and tests migrations, validation, reads, edits, authorization and draft visibility without touching production records.

## Phone layout validation
Checked local iframe viewports at 320, 390 and 430 pixels. Navigation opens and closes on link selection; form fields render at 16px and 50px tall at the 390px test width. The phone layout uses 44px minimum primary touch targets, scrollable category filters and a single-column registration form. This checks responsive layouts, not real-device Safari behavior.

## Simplified visitor journey
The homepage now follows hero, about, three program categories, published programs, compact Coming Soon store, community values and joining, then organizer/contact. Navigation is limited to Tentang, Program and Connect Store. At narrow widths the header button says Sertai; there is no horizontal document overflow in the 320px preview.

Membership requires only name, WhatsApp, age (18–30), state/region and interests. Email, nickname, district, occupation, skills and expectations are optional. Additional information is in a disclosure panel. The form explains review and contact after submission. Required Aku Janji and privacy consent remain.

Program posts include a manually managed registration status: Maklumat sahaja, Dibuka, Ditutup or Selesai. Dibuka requires an HTTPS registration link. Existing posts default to Maklumat sahaja; no legacy program is advertised as open automatically.

The contact section identifies Danial Roi as the community organizer and provides an on-site inquiry form instead of publishing an unverified official phone or email. Inquiry data is available to allowlisted admins only in Pertanyaan. The form does not promise automatic emails, notifications or a response time.
