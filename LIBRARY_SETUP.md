# React Util Components - Library Setup

This repository is now configured to be used as an npm package directly from GitHub.

## Changes Made

### 1. Package.json Configuration

- Removed `"private": true`
- Added library entry points: `main`, `module`, `types`, and `exports`
- Moved React dependencies to `peerDependencies`
- Added `files` array to specify what gets published
- Updated build scripts

### 2. Build Configuration

- Configured Vite to build as a library (vite.config.ts)
- Added vite-plugin-dts for TypeScript declaration file generation
- External dependencies (React, ReactDOM) properly configured

### 3. Entry Point

- Created `src/index.ts` to export all components

### 4. TypeScript Configuration

- Created `tsconfig.lib.json` for library builds
- Configured to generate .d.ts declaration files

## How to Use in Your Preact+Vite App

### Step 1: Install the Package

In your Preact+Vite app, add the package:

```bash
npm install github:TechsophyOfficial/react-util-components#main
```

Or in your `package.json`:

```json
{
  "dependencies": {
    "react-util-components": "github:TechsophyOfficial/react-util-components#main"
  }
}
```

### Step 2: Build This Library

Before using, you need to build this library first. After making changes:

```bash
npm run build
```

This will:

- Generate bundled JavaScript files in `dist/`
- Generate TypeScript declaration files
- Generate CSS files

### Step 3: Commit and Push the dist folder

**IMPORTANT**: You need to commit the `dist/` folder to your repository:

1. Remove `dist/` from `.gitignore` if it's there
2. Build the project: `npm run build`
3. Commit the dist folder:

```bash
git add dist
git commit -m "Build library files"
git push origin main
```

### Step 4: Import Components in Your Preact App

Now in your Preact app, you can import components in two ways:

#### Option A: Import from the main entry point (Recommended)

```typescript
import {
  RichTextEditor,
  LightBox,
  Shimmer,
  RenderHtmlView,
} from "react-util-components";
```

#### Option B: Import directly from source

```typescript
import RichTextEditor from "react-util-components/src/components/RichTextEditor/RichTextEditor";
import LightBox from "react-util-components/src/components/LightBox/LightBox";
import Shimmer from "react-util-components/src/components/Shimmer/Shimmer";
```

### Step 5: Import CSS

Don't forget to import the CSS file:

```typescript
import "react-util-components/dist/react-util-components.css";
```

## Preact Compatibility

Since you're using Preact, make sure you have the React compatibility layer configured in your Preact app:

```bash
npm install preact-compat
```

And in your `vite.config.ts` or `vite.config.js`:

```typescript
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
});
```

## Development Workflow

### In This Repository (react-util-components):

1. Make changes to components
2. Test locally with `npm run dev`
3. Build the library: `npm run build`
4. Commit all changes INCLUDING the dist folder
5. Push to GitHub

### In Your Preact App:

1. Update the package:

```bash
npm update react-util-components
```

Or force reinstall:

```bash
npm install github:TechsophyOfficial/react-util-components#main --force
```

## Available Scripts

- `npm run dev` - Run the demo app in development mode
- `npm run build` - Build the library (creates dist folder)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the built demo app

## Exported Components

- **LightBox** - Lightbox component for image display
- **RichTextEditor** - Rich text editing component
- **RenderHtmlView** - HTML rendering component
- **Shimmer** - Loading shimmer effect component

## Troubleshooting

### Error: "Cannot find module 'react-util-components/...'"

1. Make sure you've built and committed the `dist` folder in this repository
2. Try reinstalling: `npm install github:TechsophyOfficial/react-util-components#main --force`
3. Clear your node_modules and package-lock.json, then reinstall

### TypeScript Errors

Make sure the `dist/` folder with `.d.ts` files is committed to the repository.

### React/Preact Compatibility Issues

Ensure your Preact app has the React compat aliases configured in vite.config.

## Files Structure

```
react-util-components/
├── src/
│   ├── index.ts              # Main entry point
│   └── components/
│       ├── LightBox/
│       ├── RichTextEditor/
│       └── Shimmer/
├── dist/                      # Built library files (MUST be committed)
│   ├── react-util-components.js
│   ├── react-util-components.umd.cjs
│   ├── react-util-components.css
│   └── index.d.ts
├── package.json
├── vite.config.ts
├── tsconfig.lib.json
└── .npmignore
```

## Notes

- The `dist/` folder MUST be committed to Git for GitHub package installation to work
- Always run `npm run build` before committing changes
- Update the version in `package.json` when making releases
- The `.npmignore` file controls what gets excluded when used as an npm package
