# Build Before Commit Rule

## Overview

To ensure that all changes to the distribution files are properly included in commits, we must always run the build process before committing changes to the repository.

## Guidelines

1. **Always Build Before Committing**: Run `npm run build` before staging and committing changes to ensure that the `/dist` directory contains the latest compiled code.

   ```bash
   npm run build
   git add src/ dist/
   git commit -m "feat/fix/chore: your commit message"
   ```

2. **Include Distribution Files**: Always include the updated distribution files (`/dist`) in your commits when source files have been modified.

3. **Verify Build Success**: Ensure the build process completes successfully before proceeding with the commit.

4. **Commit Message Format**: Follow the Conventional Commits format as specified in the project guidelines.

## Rationale

The `/dist` directory contains the compiled and optimized code that is actually used by consumers of this library. By ensuring we always build before committing, we:

1. Prevent inconsistencies between source code and distribution files
2. Ensure that all changes are properly reflected in the distribution
3. Catch build-time errors before they are committed
4. Maintain a clean and accurate version history

## Implementation

This rule should be enforced through:

1. Team awareness and code review practices
2. Potentially adding a pre-commit hook using Husky or similar tools to automate this process

## Examples

**Correct workflow:**
```bash
# Make changes to source files
vim src/widget-utils.js

# Build the project
npm run build

# Stage both source and distribution files
git add src/widget-utils.js dist/

# Commit with appropriate message
git commit -m "fix: resolve session ID tracking issue"
```

**Incorrect workflow:**
```bash
# Make changes to source files
vim src/widget-utils.js

# Stage only source files (missing the build step)
git add src/widget-utils.js

# Commit without building
git commit -m "fix: resolve session ID tracking issue"
```
