# ADR-0002: Client Data and UI State Boundary

> **Status**: Proposed
> **Date**: 2026-05-03
> **Owners**: web/dev
> **Related requirements**: `TR-DIET-003`, `TR-DIET-004`, `TR-DIET-005`, `TR-DIET-008`, `TR-DIET-009`

## Context

The app currently includes Redux Toolkit and TanStack Query, while many components also perform direct `fetch` calls and store server data in local component state. This works for a small app, but it makes future AI changes harder because there is no clear rule for where server state, imported food state, and UI-only state belong.

## Decision

- Server data should be fetched and cached through one primary pattern.
- For this app, prefer TanStack Query for server state such as records, weekly chart data, and Open Food Facts results if kept client-side.
- Redux Toolkit should be reserved for cross-screen UI/session workflow state that is not naturally server state, or removed if not needed.
- Local component state should hold ephemeral UI state only: input text, selected date, modal open state, pending form values.

## Alternatives Considered

1. **Keep direct fetch + local state everywhere**
   - Pros: simplest for tiny screens.
   - Cons: repeated loading/error/refetch logic, harder cache invalidation.

2. **Use Redux Toolkit for all data**
   - Pros: centralized.
   - Cons: more boilerplate; server cache semantics become custom work.

3. **Use TanStack Query for server state + local state for UI state**
   - Pros: good fit for fetch/cache/refetch/mutations; less boilerplate.
   - Cons: requires refactor and query key conventions.

Recommended: option 3.

## Consequences

### Positive
- Record create/edit/delete can invalidate/refetch dashboard queries consistently.
- Delete success can update UI without manual commented-out refetch code.
- Food search can gain loading/error/retry handling consistently.

### Negative / Tradeoffs
- Requires small refactor of `HistoryTable`, `LineChart`, and food search.
- Existing Redux slices need review; some may become unnecessary.

## Implementation Rules

### Required
- Define query keys for records by date, weekly records, and food search.
- Mutations invalidate or update the relevant query cache.
- Components render loading, empty, error, and success states.
- UI-only state remains local unless it must cross route/screen boundaries.

### Forbidden
- Do not duplicate the same server data in Redux and TanStack Query.
- Do not leave stale UI after mutations; refetch or update cache.
- Do not put API response blobs into global state without typed shape.

### Guardrails
- Refactors should be story-sized: start with dashboard record management before food search.

## Migration / Rollback

- Migrate one screen at a time.
- If a query refactor breaks UX, rollback to the previous component-local fetch while keeping tests/evidence.

## Verification

- Dashboard load shows loading/empty/success states.
- Delete removes the row or refetches data without page reload.
- Weekly chart still renders from the same source of truth.
