# Feature Brief: Diet Recording

> **Status**: Draft
> **Owner**: Isaac
> **Created**: 2026-05-03
> **Primary metric**: successful daily record entries per active user

## 1. Overview

Diet or Die lets a signed-in user record daily diet/nutrition data, either by entering food manually or importing nutrition values from Open Food Facts. The dashboard lets the user review, edit, delete, and summarize records by date and recent week.

## 2. User Goal / Job To Be Done

When a user is tracking diet intake, they want to quickly log foods and see daily macro/calorie totals, so they can understand whether their eating matches their goal.

## 3. Scope

### In scope
- Email/password signup and login.
- Protected dashboard for signed-in users.
- Add food record manually.
- Search Open Food Facts and import a food as a record.
- View records by selected date.
- Edit and delete existing records.
- Weekly line chart for recent records.

### Out of scope
- Social login expansion.
- Nutrition goal recommendations.
- Barcode scanning.
- Paid plans.
- Multi-user sharing.

## 4. Requirements

- `TR-DIET-001`: A visitor can create an account with a valid email and password.
- `TR-DIET-002`: A signed-in user can log in and access protected dashboard routes.
- `TR-DIET-003`: A signed-in user can manually create a food record with food name, protein, carbs, fats, calories, food size, and intake date.
- `TR-DIET-004`: A signed-in user can search Open Food Facts and import a product into the add-record flow.
- `TR-DIET-005`: A signed-in user can view only their own records for a selected date.
- `TR-DIET-006`: A signed-in user can edit only their own records.
- `TR-DIET-007`: A signed-in user can delete only their own records.
- `TR-DIET-008`: A signed-in user can see aggregate daily macro/calorie totals.
- `TR-DIET-009`: A signed-in user can see recent weekly nutrition trend data.
- `TR-DIET-010`: API responses must not expose password hashes, secrets, stack traces, or raw internal errors.

## 5. Flows and States

### Signup / Login
- Primary: user enters email/password → validation passes → account/session created → dashboard.
- Error: invalid email/password → field-level error; duplicate email → recoverable error.
- Loading: submit button disabled while request is in flight.

### Add manual record
- Primary: user fills food fields and date → submit → record created → dashboard refresh.
- Error: validation error shown near field; API error shown as toast/message.
- Empty: form starts with safe defaults.

### Food search import
- Primary: user searches food → results render → user selects product → imported values prefill add form.
- Error: external API failure shows retryable message.
- Empty: before search, show prompt; no results, show no-results state.

### Dashboard record management
- Primary: user selects date → records load → totals render → edit/delete actions available.
- Loading: table/chart show loading state.
- Empty: no records message.
- Error: fetch/delete/edit failure shown without losing previous data when possible.
- Unauthorized: redirect to unauthenticated page.

## 6. Dependencies

- NextAuth Credentials provider.
- Prisma PostgreSQL database.
- Open Food Facts API.
- React Hook Form + Zod.
- Tailwind/shadcn UI components.

## 7. Analytics / Observability

Currently absent. Suggested events if analytics are added later:

- `signup_completed`
- `record_created`
- `record_updated`
- `record_deleted`
- `food_search_submitted`
- `food_import_selected`

## 8. Accessibility / Localization

- Forms need labels and field-level errors connected to inputs.
- Icon-only edit/delete controls need accessible names.
- Delete confirmation must be keyboard reachable and focus-safe.
- Use text UI instead of browser `alert` for better accessibility.
- Current app appears English-only; if localized later, move copy into a catalog.

## 9. Acceptance Criteria

- Given a duplicate signup email, when the user submits signup, then the UI shows a recoverable duplicate-email error and no password hash is returned.
- Given an unauthenticated visitor, when they access dashboard routes, then they are redirected to `/unauthenticated`.
- Given a signed-in user, when they create a valid manual record, then the record is stored with that user's id and appears on the selected date.
- Given a signed-in user, when they request another user's record id, then the API does not return or mutate that record.
- Given no records for a selected date, when the dashboard loads, then the table shows a no-records state and totals do not crash.
- Given Open Food Facts returns unavailable/missing nutrition fields, when a user selects a product, then the app handles missing values safely.

## 10. Open Questions

- Should failed auth/validation responses use `{ error: string }` or a structured `{ error: { code, message, fields } }` envelope?
- Should Open Food Facts search stay client-side, or move behind a server API route for validation/cache/rate-limit?
- Should Redux Toolkit remain, or should TanStack Query own server state and local component state own UI-only state?
