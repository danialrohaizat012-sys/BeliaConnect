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

## Program posters and activity gallery
Program cards accept an optional uploaded poster (contained, never cropped), registration status and a cost label: not yet set, free or paid in RM. Existing programs keep an unknown cost rather than implying free entry. Hero and navigation clarify free membership and point visitors to programs; the join section explains the three-step process.

Admin → Program → Add/Edit: upload a JPG/PNG/WebP poster, set cost and optionally price. Admin → Galeri → Tambah album: add title, date/location, description, up to 12 photos and individual captions; confirm permission to publish. Save as draft or publish. A published album appears in Momen bersama. The viewer supports next/previous, captions, Escape and native dialog focus management. Empty gallery uses truthful placeholder copy. No sample photos are deployed.

Uploads are resized client-side to a maximum 1800 px edge as WebP and stored in R2; authenticated allowlisted admins only. Server checks origin, size and image signature. Unpublished/unreferenced media is not served publicly, and all responses are no-store so unpublishing takes effect without a CDN cache window. Removed images remain private in storage; removal detaches the reference without destructive object deletion.

Validation: isolated D1/R2 integration suite covers upload auth/origin, unsupported file type, draft access, poster/price persistence, album consent and limits, publishing and hiding media after withdrawal/deletion. Browser checked phone widths 320/390/430 without horizontal overflow, mobile gallery navigation, admin album fields and image viewer next/previous. Physical iOS not tested.

## Compact public layout
The about section now combines a short introduction with three compact focus cards. Programs remain a separate visual priority: contained poster, category/title, date/location, cost/status, native expandable details and registration link. The new ProgramCard component does not change admin fields or stored program data. No sample programs are published.

Empty programs use a single inline notice; the empty gallery uses a compact heading and one sentence. Community culture and its pledge link are integrated with the join steps, reducing repeated sections. Public heading sizes, spacing and button shapes are aligned, retaining the green identity and footer credit. Phone QA at 320/390/430 shows no horizontal overflow; category buttons update the filter and program details expand correctly.
