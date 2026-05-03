# STORY-0004: Make food search URL-safe and failure-aware

> **Status**: Ready
> **Type**: UI / Integration
> **Feature**: Diet Recording
> **Requirement IDs**: `TR-DIET-004`, `TR-DIET-010`
> **Governing ADR**: `docs/adr/ADR-0002-client-data-state.md`
> **Manifest Version**: 2026-05-03
> **Test Evidence Path**: `docs/evidence/STORY-0004.md`

## Goal

Make Open Food Facts search safer and more predictable by encoding user input and showing recoverable failure/no-result states.

## Acceptance Criteria

- [ ] Given a search term with spaces or special characters, when the user searches, then the outgoing URL encodes the term safely.
- [ ] Given Open Food Facts returns an error or network fails, when search completes, then the UI shows a recoverable error state.
- [ ] Given no products are returned, when search completes, then the UI shows a no-results state.
- [ ] Given a product has missing nutrition fields, when selected for import, then the app does not crash and handles missing values safely.

## Implementation Notes

- Likely files: `components/FoodData.tsx`, `components/ImportedFoodCard.tsx`, `components/AddNewRecordForm.tsx`.
- Minimal first fix: `encodeURIComponent(searchTerm)` and explicit error state.
- Follow-up option: move search behind an API route with query validation/cache/rate limit.

## Dependencies

- None, but `ADR-0002` should guide whether TanStack Query is introduced here or later.

## QA / Evidence Plan

- Manual: search `ice cream & milk`, network failure simulation, no-result query.
- Automated optional: component test around URL builder if extracted.

## Review Notes

- Code review:
- Product/design review:
- Deviations accepted:
