# Evidence: Dependabot alert #148 — `braces` stack-exhaustion DoS

> Date: 2026-10-14
> Verifier: AI-assisted local check
> Environment: local clone at `/tmp/dod-nextjs`, Node v25.2.1, npm 11.18.0

## Advisory

- Alert: #148, severity high, scope runtime
- Package: `braces <= 3.0.3` via `package-lock.json`
- CVE-2026-93687 / GHSA-vfj7-8cjw-p6xm, CWE-674
- Trigger: a deeply nested brace pattern that stays under the 10,000-character input cap
  exhausts the call stack in the recursive walkers of `lib/compile.js` and `lib/expand.js`
  and terminates the Node process.

## No version bump is possible

- `braces` has no fixed release. Latest published version is 3.0.3 (2024-05-21). The upstream
  fix, micromatch/braces#72, was closed on 2026-10-05 and the maintainers declined to ship it.
- `braces` has a single parent in this lockfile, `micromatch`, whose latest release (4.0.8) and
  master branch still require `braces: ^3.0.3`.
- `micromatch` is reached only through `fast-glob`, whose latest release (3.3.3) and unreleased
  master (4.0.0) both still depend on `braces`. The brace-free refactors (fast-glob#535, #536)
  are open, not released.
- `@next/eslint-plugin-next` (latest 16.4.0, and 16.5.0-canary.10) pins `fast-glob: 3.3.1`, so
  upgrading `eslint-config-next` does not remove `braces` either.

`npm ls braces micromatch` at this commit:

```
dod-nexjs@0.1.0
├─┬ eslint-config-next@13.4.8
│ └─┬ @typescript-eslint/parser@5.62.0
│   └─┬ @typescript-eslint/typescript-estree@5.62.0
│     └─┬ globby@11.1.0
│       └─┬ fast-glob@3.3.3
│         └── micromatch@4.0.8 deduped
├─┬ jest-environment-jsdom@29.7.0
│ └─┬ @jest/fake-timers@29.7.0
│   └─┬ jest-message-util@29.7.0
│     └── micromatch@4.0.8 deduped
└─┬ jest@29.7.0
  └─┬ @jest/core@29.7.0
    ├─┬ @jest/transform@29.7.0
    │ └── micromatch@4.0.8 deduped
    ├─┬ jest-config@29.7.0
    │ └── micromatch@4.0.8 deduped
    ├─┬ jest-haste-map@29.7.0
    │ └── micromatch@4.0.8 deduped
    └─┬ micromatch@4.0.8
      └── braces@3.0.3
```

## Reachability in this project

- Every call site is build/lint/test tooling: ESLint file and ignore matching, Next.js ESLint
  plugin file discovery, and Jest 29's haste map (Jest 30 dropped `micromatch`). No runtime
  server path loads `braces`.
- No application code performs glob or brace expansion. `app/`, `lib/`, `components/` and
  `hooks/` contain no use of `micromatch`, `fast-glob`, `braces`, `glob` or `picomatch`.
- The advisory requires an attacker-supplied pattern. All patterns reaching `braces` come from
  repository files and tool configuration; no request data is passed to a glob matcher.

## Decision

Dismissed as tolerable risk on 2026-10-14: accurate advisory, no upstream fix, reachable only
from developer-controlled patterns in lint and test tooling. Reopen if the project ever accepts
user-supplied glob patterns.

## Revisit trigger

Reopen and upgrade as soon as any of these ships:

- `fast-glob` releases the brace-free refactor (#535 / #536) and `@next/eslint-plugin-next`
  stops pinning `fast-glob@3.3.1`
- `micromatch` drops `braces`
- a patched `braces` above 3.0.3 is published

## Automated checks

- Command: `npm run test:ci`
- Result: pass — 11 suites, 51 tests.

- Command: `npm run lint`
- Result: pass.

## Deviations

- No dependency change was made. Every alternative that removes `braces` today means shipping
  unreleased code (fast-glob's open refactor branch, or a single-maintainer `braces` fork
  published on npm) or dropping the Next.js ESLint rules — both a larger supply-chain risk than
  this non-reachable, development-time denial of service.
- Jest 29 → 30 removes the Jest call sites (Jest 30 uses `picomatch`), but not the ESLint ones,
  so it does not close this alert.
