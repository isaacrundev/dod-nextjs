# Evidence: STORY-0001 Signup returns safe response

> Date: 2026-05-03
> Verifier: AI-assisted local check
> Environment: local clone at `/tmp/dod-nextjs`

## Automated checks

- Command: `npm run test:ci`
- Result: pass — regression test confirms signup route no longer returns `NextResponse.json(newUser)` and Prisma create uses `select` for `id` and `email` only.

- Command: `npm run lint`
- Result: pass.

## Manual review

- File inspected: `app/api/signup/route.ts`
- Result: successful signup response is `{ ok: true, user: { id, email } }` with status `201`; password hash is not selected or returned.

## Deviations

- This evidence uses source-level regression checks rather than full API integration tests because the repo does not yet have a test database harness.
