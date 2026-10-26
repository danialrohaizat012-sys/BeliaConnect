# Public website and restricted administration

The public homepage, published programs and membership registration do not require ChatGPT sign-in. Eligibility remains ages 18 through 30.

The `/admin` page uses dispatch-owned ChatGPT authentication. Both the page and all administrative API operations require a verified user ID plus an email matching the runtime `ADMIN_EMAILS` allowlist. `ADMIN_EMAILS` is a comma-separated list, normalized case-insensitively. Missing configuration denies admin access. Keep actual admin email addresses in the hosting environment, not source control.

Public GET responses contain published posts only. Member records and draft posts are available only through authorized admin requests. Administrative writes enforce the same allowlist and the existing same-origin check. Public registration uses the existing server-side data, consent and age validation.

Changing hosting access to public is performed only after deploying the server-side authorization. Migrating to a different host also requires preserving trusted identity-header handling and configuring admin access on that host.

Run `node scripts/test-program-categories.mjs` to verify anonymous registration, age boundaries, category validation, publication visibility, authorized administration and rejection of anonymous or non-admin access.
