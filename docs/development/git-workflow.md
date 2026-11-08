# Git Workflow and Version Control Guidelines

---

## 1. Branching Strategy (Trunk-Based Development with Short-Lived Branches)

We follow a GitHub Flow / Trunk-Based Development model:

- `main`: Production-ready branch. Always protected. Direct pushes are disabled.
- Feature / Bugfix branches: Created from `main`, named descriptively:
  - `feat/<issue-id>-<short-description>` (e.g. `feat/AUTH-102-user-registration`)
  - `fix/<issue-id>-<short-description>` (e.g. `fix/CART-405-quantity-overflow`)
  - `chore/<short-description>` (e.g. `chore/upgrade-vitest`)

---

## 2. Conventional Commits Standard

All commit messages are strictly validated by **Commitlint** using the [Conventional Commits specification](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types:

- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation-only changes.
- `style`: Changes that do not affect the meaning of code (formatting, white-space).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `build`: Changes that affect the build system or external dependencies (pnpm, Vite, Nest).
- `ci`: Changes to CI configuration files and scripts (GitHub Actions).
- `chore`: Other changes that do not modify src or test files.
- `revert`: Reverts a previous commit.

### Example Valid Commits:

```
feat(catalog): implement product filter by price range
fix(cart): prevent negative cart item quantities
docs(readme): update local docker development steps
ci(github): add container build verification job
```

---

## 3. Pull Request Guidelines

1. **Keep PRs Focused:** Aim for small, single-purpose PRs (< 400 lines of changes).
2. **Quality Gates Must Pass:**
   - Pre-merge checks on GitHub Actions must turn green:
     - Dependency installation
     - Prettier formatting check
     - ESLint linting
     - TypeScript compilation
     - Unit & Integration test suites
3. **Squash and Merge:** PRs are squashed into `main` with a clean, conventional commit message matching the feature intent.
