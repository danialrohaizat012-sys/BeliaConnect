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

## Member IDs and accounts
Membership numbers are assigned atomically only upon approval. BC-1 is reserved for the founder; ordinary allocations start at BC-2 even if founder provisioning has not run. Numbers are never deleted/reused by the application. An allocation and approval share a D1 transaction; competing approvals do not duplicate IDs. IDs are references, never login credentials.

`/ahli` requires Sites ChatGPT sign-in. There is no telephone OTP provider configured. The public website and open guest program signup remain anonymous. Signed membership applications bind to the verified Sites user ID/email. Older unbound applications can match one verified email; admins can correct an unbound application's email after verifying with its owner. A partial case-insensitive unique email index prevents ambiguous links; optional empty emails remain supported. Account responses exclude private review notes and reviewer identity. Member phone updates bind the account ID and require a valid unused phone.

Founder provisioning is a bounded, one-time action. Production `OWNER_PROFILE` is secret server configuration supplied by the owner; the setup caller cannot supply or change name/email/ID. With `OWNER_SETUP_ENABLED=true`, `/owner-setup` can invoke that exact preconfigured enrollment. The atomic BC-1 number allocation permanently prevents any second founder record; the response exposes only the member code. The enable flag is removed after provisioning. This creates no login/session/admin credential. The founder remains linked to their existing verified email. Unknown phone is left empty and must be completed in their account before joining a program; no phone or pledge acceptance is fabricated.

## Program participation
Admin program settings support internal signup or a retained external URL, eligibility (all / active official members), manual / automatic confirmation, optional capacity and one required custom answer. New programs default to internal/manual; old records retain external URLs. Costs must be finalized before internal signup opens. Native program pages live at `/program/<id>`.

Internal signup is stored in `registrations`, separate from membership. Active verified members use server-derived member details/ID; guest-supplied member IDs are ignored. Public guest submissions never create membership. Member-only registration checks active membership server-side; pending/suspended/rejected users are blocked. Duplicate normalized phone, duplicate account/member and capacity are checked atomically. Pending and confirmed entries both reserve capacity; rejection releases a place. Administrative capacity edits cannot go below occupied capacity. Paid fees are snapshotted on registration; paid participation always awaits admin payment review and confirmation even with automatic mode. This version has no payment gateway or automated messages.

Admin → Peserta lists registrations by program/status, member versus guest, answer, payment, seat status and attendance. The administrator marks payment received before confirming a paid seat. Only confirmed participants can receive attendance records. Updates use an expected monotonically increasing timestamp to reject stale edits. Members see only their own application/participation history. Guest confirmation displays a reference; without signing in, guests follow up with urusetia.

Tests: isolated D1 suite `scripts/test-member-program-flow.mjs` verifies founder idempotence, BC numbering concurrency, own-account privacy, verified identity binding, guest/member separation, restricted eligibility, duplicate/capacity races, fee snapshot, payment gate, stale edits, attendance and closed registration. Fixtures are never published. Phone layouts checked at 320/390/430 without horizontal overflow.
