# STORY-0001: Signup returns safe response

> **Status**: Implemented / needs review
> **Type**: API
> **Feature**: Diet Recording
> **Requirement IDs**: `TR-DIET-001`, `TR-DIET-010`
> **Governing ADR**: `docs/adr/ADR-0001-auth-and-record-ownership.md`
> **Manifest Version**: 2026-05-03
> **Test Evidence Path**: `app/__test__/index.test.ts` and `docs/evidence/STORY-0001.md`

## Goal

Prevent the signup API from returning password hashes or full Prisma user rows to clients.

## Acceptance Criteria

- [x] Given a valid new email and password, when `/api/signup` succeeds, then the response contains no `password` field.
- [x] Given a duplicate email, when `/api/signup` is called, then the response is a stable duplicate-email error and does not expose internal DB errors.
- [x] Given invalid input, when `/api/signup` is called, then the response is a validation error with status `400`.

## Implementation Notes

- Likely file: `app/api/signup/route.ts`.
- Consider returning `{ ok: true, user: { id, email } }` or `{ ok: true }`.
- Avoid `catch (error: any)` returning generic/raw internals for all cases.

## Dependencies

- None.

## QA / Evidence Plan

- Automated: source-level regression in `app/__test__/index.test.ts` until API handler tests have a DB/session harness.
- Manual: inspect network response after signup and confirm no `password` field.

## Review Notes

- Code review:
- Product/design review:
- Deviations accepted:
