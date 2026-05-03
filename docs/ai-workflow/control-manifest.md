# Diet or Die Control Manifest

> **Manifest Version**: 2026-05-03
> **Framework**: Next.js App Router + React 18 + TypeScript + Prisma + NextAuth
> **Status**: Draft
> **Source**: README + current code audit + proposed ADRs

This is the implementation rule sheet for AI-assisted work in `dod-nextjs`. ADRs explain why; this document tells contributors what to do and what not to do.

## Global Rules

### Required
- All behavior changes must trace to `docs/product/diet-recording.md` requirement IDs or a story under `docs/stories/`.
- All API/server inputs are validated with Zod or an equivalent schema before use.
- Server-side auth and authorization checks are required for every protected read/write.
- Client-visible responses must not include secrets, password hashes, stack traces, internal DB errors, or raw exception messages.
- Critical logic must ship with automated tests or a documented evidence file.

### Forbidden
- Do not return Prisma `User` objects directly to clients.
- Do not trust client-supplied user id, record owner, role, price, quota, or tenant fields.
- Do not access Prisma from client components.
- Do not use raw `error.message` as a public API response for operational errors.
- Do not use `any` or non-null assertions (`!`) to bypass real nullable states in API/security code.

## Layer: App Routes / Layouts

### Required
- Protected route groups must check `getServerSession(authOptions)` in server components/layouts or equivalent middleware.
- Unauthorized state must redirect or render a clear recovery path.
- Public pages should have clear loading/empty/error states where data is fetched.

### Forbidden
- Do not rely on hidden navigation links as access control.
- Do not duplicate auth logic in multiple places without a shared helper or documented reason.

## Layer: API Routes

### Required
- Validate route params and request body separately.
- For protected record routes, resolve the current user from session email before DB operations.
- Ownership-sensitive operations must prove `record.userId === currentUser.id` before returning/updating/deleting.
- Zod validation errors should return `400` with a stable shape: `{ error: { code, message, fields? } }`.
- Unauthorized requests return `401`; forbidden ownership failures return `404` or `403` consistently.

### Forbidden
- Do not use `findUnique/update/delete` with `{ id, userId }` unless Prisma schema defines the matching compound unique key.
- Do not use broad catch blocks to convert all errors into `400`.
- Do not log sensitive request body fields such as password.

## Layer: Prisma / Database

### Required
- User-owned records must always be queried with ownership constraints.
- Migrations changing user data or records require rollback notes under `docs/evidence/`.
- Password fields are write-only from the API perspective.

### Forbidden
- Do not expose password hashes, adapter internals, or full user rows in API responses.
- Do not make destructive schema changes without backup/rollback notes.

## Layer: React Components

### Required
- Forms use React Hook Form + Zod or a documented equivalent.
- Inputs have labels, field-level errors, and disabled/loading states.
- Mutations show success and failure through UI state or toast, not `alert`.
- Components that fetch data must represent loading, empty, error, and success states.
- Interactive icons need accessible labels or text.

### Forbidden
- Do not fetch protected data directly from reusable presentational components unless the component owns the screen flow.
- Do not use clickable icons without button semantics.
- Do not leave `console.log` in production UI paths.

## Layer: Food Search / External API

### Required
- Search terms must be URL-encoded.
- External requests need failure UI and retry/recovery path.
- Search should avoid duplicate rapid requests via debounce, cancellation, or explicit submit behavior.
- If moved server-side, validate the query and consider rate limiting/cache.

### Forbidden
- Do not interpolate raw user input directly into external URLs.
- Do not assume Open Food Facts nutrition fields are present or numeric.

## Layer: Tests / Evidence

### Required
- `npm run test:ci` should run once and exit for agents/CI.
- API validation and ownership behavior need tests before major API refactors.
- UI stories need evidence for loading, empty, error, and success states.

### Forbidden
- No empty test files pretending to provide coverage.
- No tests that require live external APIs.
- No skipped tests without a linked follow-up.

## Current Known Exceptions

- Current tests are source-level regression checks; full API integration tests still need a database/session test harness.
- Several UI components still use `alert` and `console.log`; treat as existing debt, not a precedent.
- `components/QueryProdider.tsx` and package name typos are known cleanup items.
- `npx tsc --noEmit` currently fails on pre-existing static image module declarations and Radix DialogPortal typing issues; resolve before making typecheck a required gate.
