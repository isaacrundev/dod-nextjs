# Active Session State

> **Updated**: 2026-05-03 21:50 Asia/Taipei
> **Current task**: Web Mini Studio brownfield POC for `dod-nextjs`
> **Status**: Complete for Phase A seed patch; ready for review

<!-- STATUS -->
Feature: Diet Recording
Story: STORY-0001 signup safe response; STORY-0002 record ownership
Task: Create baseline docs/artifacts and fix two critical API safety issues
<!-- /STATUS -->

## What has been decided

- Signup must not return full Prisma `User` rows or password hashes.
- Record GET/PUT/DELETE must verify current-user ownership before returning or mutating records.
- `npm run test:ci` is the agent/CI-safe test command.
- `npm run lint` uses `eslint .` because `next lint` is not valid with the installed Next version.

## Files being touched

- `app/api/signup/route.ts` — safe signup response and validation error shape.
- `app/api/records/id/[id]/route.ts` — UUID param validation and ownership checks.
- `app/__test__/index.test.ts` — source-level safety regression tests.
- `package.json` — add CI test script and fix lint script.
- `docs/**` — product brief, ADRs, control manifest, stories, evidence templates.

## Current step

- Human/code review of the POC patch.

## Blockers / Questions

- Full API integration tests need a database/session test harness before they can replace source-level regression tests.
- Product decision still open: standard API error envelope shape.

## Last verification

- Command/evidence: `npm run lint`
- Result: pass
- Command/evidence: `npm run test:ci`
- Result: pass, 2 tests
- Command/evidence: `npx tsc --noEmit`
- Result: blocked by pre-existing image module declaration and Radix DialogPortal typing issues unrelated to this patch.

## Handoff notes

Read first:

1. `docs/ai-workflow/control-manifest.md`
2. `docs/product/diet-recording.md`
3. `docs/adr/ADR-0001-auth-and-record-ownership.md`
4. `docs/stories/STORY-0001-signup-safe-response.md`
5. `docs/stories/STORY-0002-record-ownership.md`
