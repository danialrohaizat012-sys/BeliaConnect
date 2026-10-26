/** Accept only dispatch-authenticated users explicitly configured as administrators. */
export function isAdminIdentity(userId: string | null | undefined, email: string | null | undefined, configuredEmails: string | undefined): boolean {
  if (!userId || !email || !configuredEmails) return false;
  const allowed = configuredEmails.split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
