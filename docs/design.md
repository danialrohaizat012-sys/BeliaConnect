# Belia Connect — Concept 02

The selected direction is a photographic community website: white navigation, a forest-green hero overlay, lime calls to action and clear program categories.

## Program taxonomy
- Networking: introductions, professional relationships and collaboration.
- Pembangunan: learning, skills, careers and personal development.
- CSR: volunteering, community service and social contribution.

Each Program requires one primary category. Opportunities remain a separate content type. Existing records keep a null category until an administrator categorizes them; the migration does not guess their category.

## Assets
- `public/logo.png`: original logo supplied by the owner. The navbar uses a CSS crop and color treatment of its central mark, paired with a text wordmark. The original file is unchanged.
- `public/community-hero.png`: AI-generated illustrative community photo, created with the built-in image-generation tool. It is not documentary evidence of an actual Belia Connect event. The website labels the image as illustrative.

Hero prompt: A wide premium editorial lifestyle photograph of four Malaysian young adults discussing a community project around a laptop in a contemporary tropical coworking cafe in Kelantan. Two men and two women in modest olive, cream and dark-green clothing, women wearing hijabs. Natural candid interaction, realistic skin and hands, subjects grouped on the right, defocused dark-green interior on the left for a website heading, eye-level camera, natural window light. Background photo only: no text, logos, watermark, UI, frames, collage or graphic overlays.

## Validation
Run `pnpm exec tsc --noEmit`, `pnpm build`, and `node scripts/test-program-categories.mjs`.
The category integration test uses an isolated in-memory D1 database and tests migrations, validation, reads, edits, authorization and draft visibility without touching production records.
