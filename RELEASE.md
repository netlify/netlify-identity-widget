# Release Checklist

- [ ] Make changes and/or merge PRs.
- [ ] Document changes in a gh-release draft.  If no draft exists, create one.
- [ ] `git checkout master`
- [ ] `git pull`
- [ ] `npm version [ major | minor | patch ]`
- [ ] `git push && git push --tags`
- [ ] Assign draft gh-release to new tag and publish release notes and double check everything looks right.
- [ ] `npm publish`
