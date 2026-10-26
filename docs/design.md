# Belia Connect — Concept 02

The selected direction keeps Concept 02's white navigation, forest-green hero and lime calls to action. Following owner feedback, the hero now uses a typographic graphic of the three program pillars. Category and program cards use icons, typography and metadata, without stock or generated photographs of people. Real activity photographs may be introduced when supplied by the owner.

## Program taxonomy
- Networking: introductions, professional relationships and collaboration.
- Pembangunan: learning, skills, careers and personal development.
- CSR: volunteering, community service and social contribution.

Each Program requires one primary category. Opportunities remain a separate content type. Existing records keep a null category until an administrator categorizes them; the migration does not guess their category.

## Assets
- `public/logo.png`: original logo supplied by the owner. The navbar uses a CSS crop and color treatment of its central mark, paired with a text wordmark. The original file is unchanged.
- The earlier illustrative community photograph is no longer used by the website. No photographs of random people appear in hero or cards.
- Cards use Lucide icons and category-specific accent colors with program text, dates, location and links where provided.

## Validation
Run `pnpm exec tsc --noEmit`, `pnpm build`, and `node scripts/test-program-categories.mjs`.
The category integration test uses an isolated in-memory D1 database and tests migrations, validation, reads, edits, authorization and draft visibility without touching production records.
