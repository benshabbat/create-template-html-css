# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in this project, please send an email to [your-email@example.com]. All security vulnerabilities will be promptly addressed.

Please do **not** report security vulnerabilities through public GitHub issues.

## Security Measures

### Input Validation
- **Component Names**: Validated against a whitelist of allowed components
- **Filename Sanitization**: Removes path traversators (../, ..\\), path separators, and dangerous characters
- **Alphanumeric Validation**: Ensures filenames contain at least one alphanumeric character
- **Length Validation**: Enforces maximum name length of 100 characters via CLI validation

### Path Traversal Protection
The generator implements multiple layers of protection:
1. Component names are validated against a strict whitelist
2. User-provided names are sanitized to remove:
   - Path separators (`/`, `\\`)
   - Parent directory references (`..`)
   - Dangerous characters (`<>:"|?*`)
3. Empty or invalid names are rejected

### Dependencies
All dependencies are regularly audited using `npm audit`. Current status:
- ✅ No known vulnerabilities
- All dependencies use stable, maintained versions

## Dependency Versions
- commander: ^11.1.0
- inquirer: ^9.2.12
- chalk: ^4.1.2

## Safe Usage

### Creating Templates
```bash
# Safe usage
create-template create
# Follow the prompts and provide valid names

# Avoid
- Using path separators in names (/, \\)
- Using parent directory references (..)
- Using empty names
```

### Security Best Practices
1. Always use the latest version of this tool
2. Run `npm audit` regularly
3. Review generated files before deploying
4. Don't expose the CLI to untrusted users
5. Use this tool in trusted environments only

## Vulnerability Response

### Severity Levels
- **Critical**: Immediate fix and patch release
- **High**: Fix within 7 days
- **Medium**: Fix within 30 days
- **Low**: Fix in next planned release

### Security Updates
Security updates will be released as patch versions and clearly marked in the CHANGELOG.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Code Security Features

### Generator (src/generator.js)
- Whitelist validation for component names
- Filename sanitization function
- Input validation before file system operations
- Safe path joining using Node.js path module

### CLI (bin/cli.js)
- Interactive prompts with validation
- Input length limits
- Character validation (no path separators)
- Error handling and user feedback

## Responsible Disclosure

We encourage responsible disclosure of security vulnerabilities. We commit to:
- Acknowledge your email within 48 hours
- Provide regular updates about our progress
- Credit you in the security advisory (unless you prefer to remain anonymous)

Thank you for helping keep this project and its users safe!
