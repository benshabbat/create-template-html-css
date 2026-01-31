# Development Rules & Guidelines

## Core Principles

This document outlines the mandatory rules and best practices for development on the `create-template-html-css` project. All contributors must follow these guidelines.

---

## 1. Git Workflow

### Branch Strategy

- **Create a new branch for every new task, feature, or bug fix**
- Branch naming convention: `<type>/<description>`
  - `feature/new-template` - New feature
  - `fix/backup-issue` - Bug fix
  - `docs/update-readme` - Documentation
  - `chore/update-dependencies` - Maintenance
  - `refactor/code-cleanup` - Code refactoring

### Commit Message Format

Use clear, descriptive commit messages:

```
<type>: <short description>

Optional body with more details
```

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, prettier)
- `refactor:` - Code refactoring
- `chore:` - Build, dependencies, version updates
- `test:` - Test additions/updates

### Pull Request Process

1. Create a new branch from `main`
2. Make changes
3. Commit with descriptive messages
4. Push to GitHub
5. Create pull request with clear description
6. Request review before merging
7. Merge only after approval

---

## 2. Code Standards

### Language

- **All code must be written in English**
- Comments must be in English
- Variable names in English
- Function names in English
- No Hebrew or other language characters in code

### Code Formatting

- Use **Prettier** for all code formatting
- All generated HTML, CSS, and JavaScript must be formatted with Prettier
- Run prettier before committing:
  ```bash
  npx prettier --write "src/**/*.js" "bin/**/*.js"
  ```

### Code Quality

- Follow existing code patterns and structure
- Use async/await for asynchronous operations
- Validate user input with whitelists
- Sanitize file paths and names
- Include error handling in all functions

---

## 3. File Management

### .npmignore Updates

The `.npmignore` file specifies what files to exclude from npm package publication.

**Current structure:**
- Exclude development documentation
- Exclude test files
- Exclude demo files (optional)
- Include all templates and core files

**When to update:**
- When adding new development-only files
- When changing documentation structure
- Before any npm publish

### .gitignore Updates

The `.gitignore` file specifies what files Git should ignore.

**Must always exclude:**
- `node_modules/` - Dependencies
- `.env` - Environment variables
- `npm-debug.log` - npm logs
- `.DS_Store` - macOS files
- `*.backup` - Backup files (when not intentional)
- dist/ or build/ folders

**Never ignore:**
- Source code in `src/`
- Templates in `templates/`
- Configuration files (`package.json`, `.npmignore`)
- Documentation files (`.md`)

**When to update:**
- When adding new development files
- When changing test/build structure
- Before committing

---

## 4. Version Management

### Versioning Scheme

Use Semantic Versioning (MAJOR.MINOR.PATCH):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes

Example progression: 1.6.2 → 1.6.3 → 1.7.0 → 2.0.0

### Version Update Process

When releasing a new version:

1. Update `package.json` version field
2. Update `bin/cli.js` version string
3. Update `README.md` with new features (if applicable)
4. Create git commit: `chore: Bump version to X.Y.Z`
5. Push to GitHub
6. Run `npm publish`
7. Verify with `npm view create-template-html-css version`

---

## 5. Documentation

### Required Documentation

- **README.md** - Main documentation with usage examples
- **CONTRIBUTING.md** - Contribution guidelines
- **SECURITY.md** - Security policies
- **CHANGELOG.md** - Version history and changes

### Adding Documentation

- All documentation must be in English
- Use clear headings and formatting
- Include code examples where relevant
- Keep documentation up-to-date with code changes

---

## 6. Security Requirements

### Input Validation

- Always validate user input against whitelists
- Check file paths and prevent directory traversal
- Validate HTML structure before modification
- Use strict filename validation

### File Operations

- Use `fs.promises` for async file operations
- Always handle errors in try-catch blocks
- Create backups before modifying files
- Use simple, predictable backup naming (e.g., `file.html.backup`)

### Code Review

- Security issues must be reviewed before merge
- No hardcoded credentials
- No console.log with sensitive data

---

## 7. Testing & Validation

### Before Committing

- Test the feature/fix locally
- Verify prettier formatting: `npx prettier --check "src/**/*.js"`
- Run `npm list` to check dependencies
- Test both `create` and `insert` modes if applicable

### After Publishing

- Verify package on npm: `npm view create-template-html-css version`
- Test installation: `npm install -g create-template-html-css@latest`
- Test core commands: `create-template create`, `create-template insert`, `create-template list`

---

## 8. Dependencies

### Adding New Dependencies

- Only add when necessary
- Prefer smaller, focused libraries
- Check for security vulnerabilities: `npm audit`
- Update `package.json` and commit

### Updating Dependencies

- Use `npm update` carefully
- Test thoroughly after updates
- Check for breaking changes in changelogs
- Update `package.json` lock file

---

## 9. Merge Approval

- All changes require review before merging to `main`
- Security-related changes require additional scrutiny
- Documentation changes should be verified
- Code formatting must be consistent

---

## 10. Release Checklist

Before publishing a new version:

- [ ] All commits are on `main` branch
- [ ] Git history is clean and organized
- [ ] `package.json` version is updated
- [ ] `bin/cli.js` version is updated
- [ ] All code is formatted with prettier
- [ ] No console errors or warnings
- [ ] `.npmignore` is properly configured
- [ ] `.gitignore` is properly configured
- [ ] README is updated with new features
- [ ] CHANGELOG is updated
- [ ] Git commit is created
- [ ] Git push is completed
- [ ] `npm publish` is executed
- [ ] Package is verified on npm registry

---

## Summary

**The Three Golden Rules:**

1. 🌳 **Create a new branch for every task**
2. 🌍 **Everything in English**
3. ✨ **Keep code clean with Prettier**

---

Last Updated: February 1, 2026
