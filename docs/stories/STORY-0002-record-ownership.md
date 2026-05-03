# STORY-0002: Enforce record ownership safely

> **Status**: Implemented / needs review
> **Type**: API
> **Feature**: Diet Recording
> **Requirement IDs**: `TR-DIET-005`, `TR-DIET-006`, `TR-DIET-007`, `TR-DIET-010`
> **Governing ADR**: `docs/adr/ADR-0001-auth-and-record-ownership.md`
> **Manifest Version**: 2026-05-03
> **Test Evidence Path**: `app/__test__/index.test.ts` and `docs/evidence/STORY-0002.md`

## Goal

Ensure record read, update, and delete operations only affect records owned by the signed-in user, using Prisma query patterns that are valid and explicit.

## Acceptance Criteria

- [x] Given an unauthenticated request, when fetching/updating/deleting a record, then the API returns `401`.
- [x] Given a signed-in user requesting their own record id, when fetching the record, then the API returns that record.
- [x] Given a signed-in user requesting another user's record id, when fetching/updating/deleting, then the API does not return or mutate that record.
- [x] The implementation does not use `findUnique/update/delete` with `{ id, userId }` unless Prisma schema defines a compound unique key.
- [x] Public error responses do not expose raw internal error messages.

## Implementation Notes

- Likely file: `app/api/records/id/[id]/route.ts`.
- Short-term pattern: resolve current user → `findFirst({ where: { id, userId } })` → if missing return `404` → mutate by `id` only after ownership is proven.
- Consider extracting a helper later, but keep this story focused.

## Dependencies

- `ADR-0001` should be accepted or explicitly approved.

## QA / Evidence Plan

- Automated: source-level regression in `app/__test__/index.test.ts` until service/handler tests have a DB/session harness.
- Manual: two users with records; verify cross-user id cannot be read/edited/deleted.

## Review Notes

- Code review:
- Product/design review:
- Deviations accepted:
