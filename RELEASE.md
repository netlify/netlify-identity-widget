# Release Checklist

- Make changes and or merge PRs.
- Document changes in a gh-release draft.  If no draft is created, create one.
- `git checkout master`
- `git pull`
- `yarn`
- `npm version [ major | minor | patch ] -m "Upgrade to %s for reasons"`
- `git push && git push --tags`
- `npm publish`
- Assign draft gh-release to new tag and publish release notes.
