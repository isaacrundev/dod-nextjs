# Evidence: STORY-0002 Enforce record ownership safely

> Date: 2026-05-03
> Verifier: AI-assisted local check
> Environment: local clone at `/tmp/dod-nextjs`

## Automated checks

- Command: `npm run test:ci`
- Result: pass — regression test confirms record id route uses `findFirst` with `{ id, userId }`, returns `Record not found`, and no longer uses the fragile `{ userId: getUser?.id, id }` unique/update/delete pattern.

- Command: `npm run lint`
- Result: pass.

## Manual review

- File inspected: `app/api/records/id/[id]/route.ts`
- Result: GET/PUT/DELETE parse the UUID route param, resolve the current user id from session email, verify ownership with `findFirst({ where: { id, userId } })`, and only update/delete after ownership is proven.

## Deviations

- This evidence uses source-level regression checks rather than full API integration tests because the repo does not yet have a test database harness.
