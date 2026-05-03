# STORY-0003: Dashboard delete refreshes records

> **Status**: Ready
> **Type**: UI / Integration
> **Feature**: Diet Recording
> **Requirement IDs**: `TR-DIET-005`, `TR-DIET-007`, `TR-DIET-008`
> **Governing ADR**: `docs/adr/ADR-0002-client-data-state.md`
> **Manifest Version**: 2026-05-03
> **Test Evidence Path**: `docs/evidence/STORY-0003.md`

## Goal

After a user deletes a record from the dashboard, the table and totals should update without requiring a page refresh.

## Acceptance Criteria

- [ ] Given records are visible for a selected date, when the user deletes one record and confirms, then the deleted row disappears or the date query refetches successfully.
- [ ] Given the deleted record contributed to totals, when deletion succeeds, then totals update.
- [ ] Given deletion fails, when the API returns an error, then the UI shows a recoverable error and keeps previous data visible.
- [ ] The delete control is keyboard reachable and has an accessible name.

## Implementation Notes

- Likely file: `components/HistoryTable.tsx`.
- Current code comments out the post-delete refetch.
- Short-term acceptable fix: refetch after successful delete.
- Better follow-up: use TanStack Query mutation and invalidate `records-by-date` query.

## Dependencies

- Record ownership API should be safe (`STORY-0002`) before deeper dashboard work.

## QA / Evidence Plan

- Manual: screenshot or note of before delete, after delete, and failed delete state.
- Automated optional: component test with mocked fetch.
- A11y: keyboard opens dialog, confirms/cancels, focus remains usable.

## Review Notes

- Code review:
- Product/design review:
- Deviations accepted:
