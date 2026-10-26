# Public website and restricted administration

The public homepage, published programs and membership registration do not require ChatGPT sign-in. Eligibility remains ages 18 through 30.

The `/admin` page uses dispatch-owned ChatGPT authentication. Both the page and all administrative API operations require a verified user ID plus an email matching the runtime `ADMIN_EMAILS` allowlist. `ADMIN_EMAILS` is a comma-separated list, normalized case-insensitively. Missing configuration denies admin access. Keep actual admin email addresses in the hosting environment, not source control.

Public GET responses contain published posts only. Member records and draft posts are available only through authorized admin requests. Administrative writes enforce the same allowlist and the existing same-origin check. Public registration uses the existing server-side data, consent and age validation.

Changing hosting access to public is performed only after deploying the server-side authorization. Migrating to a different host also requires preserving trusted identity-header handling and configuring admin access on that host.

Run `node scripts/test-program-categories.mjs` to verify anonymous registration, age boundaries, category validation, publication visibility, authorized administration and rejection of anonymous or non-admin access.

Public contact inquiries are stored in the inquiries table. Name, reply contact, message and consent are validated. Only allowlisted administrators may read or mark inquiries complete; public post responses exclude inquiry and member records. No external message or email is sent automatically.

## Manual membership decisions
A successful join creates a pending application (`Menunggu semakan`), never an active member, regardless of status/approval fields supplied by the visitor. Legacy `Baharu` records also appear under pending; existing active records are preserved.

Admin → Ahli defaults to pending applications. Open `Semak permohonan` to read the full submission and pledge record, optionally add a private review note, then choose `Terima sebagai ahli` or `Tolak permohonan`. Approval sets `Aktif`, acceptance time, review time and the authenticated reviewer ID. Rejection sets `Ditolak` with no acceptance time. Only active records count as `Ahli rasmi` in the dashboard. Decisions are stored, but do not automatically send WhatsApp messages; the administrator follows up manually.

The server restricts decisions to allowlisted administrators and pending applications. It compares the expected stored status and performs a conditional update, so stale or competing decisions return 409 rather than overwriting another review. The old generic status operation cannot approve pending/rejected applications. It only supports active → suspended/terminated, or suspended → active/terminated.

Validation: isolated D1 tests cover pending joins, legacy pending, approval/rejection persistence, review metadata, concurrent decisions, anonymous/other-user denial, forged approval fields, bypass prevention and suspension/restoration. Browser checks use disposable fixture components only, verifying pending → accepted/rejected, full review detail and phone dialogs; no production application was approved or rejected during development.
