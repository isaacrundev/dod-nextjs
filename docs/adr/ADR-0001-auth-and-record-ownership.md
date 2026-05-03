# ADR-0001: Auth and Record Ownership

> **Status**: Proposed
> **Date**: 2026-05-03
> **Owners**: web/dev
> **Related requirements**: `TR-DIET-001`, `TR-DIET-002`, `TR-DIET-005`, `TR-DIET-006`, `TR-DIET-007`, `TR-DIET-010`

## Context

Diet or Die stores personal diet records. Every record belongs to exactly one user. The app uses NextAuth Credentials provider and Prisma/PostgreSQL. Protected routes and API endpoints must prevent one user from reading, editing, or deleting another user's records.

Current code checks `getServerSession(authOptions)` in protected routes and API handlers, but some Prisma operations use `{ id, userId }` in `findUnique/update/delete` without a matching documented compound unique key. Signup also returns the full created user object.

## Decision

- Session identity comes from `getServerSession(authOptions)` on the server.
- The current user is resolved by `session.user.email` before protected DB operations.
- Record ownership is enforced server-side on every record read/update/delete.
- APIs never return password hashes or full `User` rows.
- Ownership failures should return a consistent non-disclosing response (`404` preferred for record not found/not owned, or `403` if the product wants explicit forbidden semantics).

## Alternatives Considered

1. **Keep current inline checks**
   - Pros: minimal change.
   - Cons: fragile, repeated, easy for future agent changes to get wrong.

2. **Add compound unique key `@@unique([id, userId])` and use compound operations**
   - Pros: efficient, explicit ownership at DB query level.
   - Cons: requires migration and generated Prisma client changes.

3. **Use `findFirst({ id, userId })` before update/delete by `id`**
   - Pros: no schema migration required, easy to reason about.
   - Cons: two-step mutation can race in theoretical edge cases; acceptable for this small app if record ownership does not change.

Recommended short-term: option 3. Recommended long-term: option 2 if ownership-sensitive queries grow.

## Consequences

### Positive
- Future API routes have a clear ownership rule.
- Agent code review can flag direct `User` returns and unsafe record mutation.
- Signup response leak is fixed by policy.

### Negative / Tradeoffs
- Some repeated helper code may appear until a shared auth/data helper is extracted.
- Adding compound unique later requires a migration.

## Implementation Rules

### Required
- Protected handlers call a shared helper or equivalent logic to get current user.
- Record reads use ownership constraints.
- Record update/delete verifies ownership before mutation.
- Public API response DTOs omit `password`.
- Auth and record APIs use stable error response shapes.

### Forbidden
- Do not return Prisma `User` objects directly.
- Do not mutate a record by `id` before proving ownership.
- Do not trust client-provided owner/user fields.
- Do not expose raw exception messages from auth/record operations.

### Guardrails
- Add tests for: duplicate signup, signup safe response, unauthenticated record request, not-owned record request.

## Migration / Rollback

- Short-term fix requires no DB migration.
- If compound unique is added later, create a Prisma migration and confirm existing `(id, userId)` pairs are unique before deploy.
- Rollback: revert helper/schema changes and regenerate Prisma client if needed.

## Verification

- `npm run test:ci` passes.
- Manual: signup response in browser/network tab contains no `password` field.
- Manual/API: a user cannot fetch/edit/delete another user's record id.
