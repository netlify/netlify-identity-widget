# Release Process

This repository uses [release-please](https://github.com/googleapis/release-please) for automated releases with [conventional commits](https://www.conventionalcommits.org/).

## How It Works

### Conventional Commits

All commits must follow the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature (bumps MINOR version)
- `fix:` - Bug fix (bumps PATCH version)
- `docs:` - Documentation only
- `style:` - Code style (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

**Breaking Changes:**
Add `!` after the type or include `BREAKING CHANGE:` in the footer to trigger a MAJOR version bump:
```
feat!: redesign authentication flow
```

### Release Flow

1. **Merge to main** - Push commits with conventional commit messages
2. **Release PR** - release-please automatically creates/updates a release PR with:
   - Version bump based on commit types
   - Auto-generated CHANGELOG
3. **Merge Release PR** - Creates a git tag (e.g., `v2.0.0`)
4. **GitHub Action** - On tag push, the release workflow:
   - Builds the project
   - Copies artifacts to `releases/v{major}/`
   - Commits changes back to main

### CDN Versioning

Built assets are deployed to Netlify and served from versioned folders:

| Folder | URL | Description |
|--------|-----|-------------|
| `releases/v1/` | `identity.netlify.com/v1/netlify-identity-widget.js` | Stable v1.x releases |
| `releases/v2/` | `identity.netlify.com/v2/netlify-identity-widget.js` | Future v2.x releases |

**Important:** The `releases/` folder is only updated via GitHub Actions on tagged releases, not on regular merges to main. This protects existing CDN users from breaking changes.

### Deploy Previews

Deploy previews copy build artifacts to `releases/` temporarily so the preview works. This doesn't affect production.

## Prereleases

For beta/alpha/rc releases:

1. Create a branch: `releases/<tag>/<version>` (e.g., `releases/beta/2.0.0`)
2. Push to the branch
3. The prerelease workflow automatically:
   - Builds with version `2.0.0-beta.{run_number}`
   - Copies to `releases/v2-beta/`
   - Publishes to npm with `--tag=beta`

### Example Prerelease Branches

| Branch | npm Tag | CDN Folder | Version |
|--------|---------|------------|---------|
| `releases/beta/2.0.0` | `beta` | `v2-beta` | `2.0.0-beta.1`, `2.0.0-beta.2`, ... |
| `releases/alpha/2.0.0` | `alpha` | `v2-alpha` | `2.0.0-alpha.1`, `2.0.0-alpha.2`, ... |
| `releases/rc/2.0.0` | `rc` | `v2-rc` | `2.0.0-rc.1`, `2.0.0-rc.2`, ... |

## Local Development

### Commit Message Validation

Commitlint enforces conventional commits via a git hook. Invalid commits are rejected:

```bash
# ❌ Will fail
git commit -m "fixed the thing"

# ✅ Will pass
git commit -m "fix: resolve authentication timeout issue"
```

### Manual Release (if needed)

```bash
# Build and copy to releases folder
yarn release
```

This is typically only needed for debugging - normal releases go through release-please.
