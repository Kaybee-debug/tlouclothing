# Lovable.dev Integration Guide

This Nuxt 3 project has been configured to work with Lovable.dev while maintaining the React-to-Nuxt conversion.

## Configuration

### 1. Lovable.dev Component Tagger
The `lovable-tagger` package has been added to `devDependencies` for component tagging in development mode.

### 2. Dev Server Configuration
The Nuxt dev server is configured to:
- Listen on `0.0.0.0` (all interfaces) for external connections
- Use port `3000` (Lovable.dev default)

### 3. Project Structure
The project maintains Nuxt 3 structure:
- `pages/` - File-based routing
- `components/` - Vue components
- `composables/` - Reusable composables
- `layouts/` - Layout components
- `middleware/` - Route middleware

## Deployment to Lovable.dev

### Option 1: Direct Deployment (if supported)
If Lovable.dev supports Nuxt projects:
1. Push your code to the repository
2. Lovable.dev should detect the Nuxt configuration
3. The build process will use `npm run build`

### Option 2: Static Export
If Lovable.dev requires static files:
```bash
npm run generate
```
This creates a static site in `.output/public/` that can be deployed.

### Option 3: Hybrid Approach
Keep both React (frontend/) and Nuxt (root) versions:
- React version in `frontend/` for Lovable.dev
- Nuxt version in root for standalone deployment

## Environment Variables

Set these in Lovable.dev's environment settings:
- `NUXT_PUBLIC_API_URL` - Backend API URL (defaults to `http://10.0.0.86:3003`)

## Notes

- The project uses Nuxt 3 with SSR enabled
- TypeScript is configured and working
- Tailwind CSS is integrated via `@nuxtjs/tailwindcss`
- Pinia is used for state management


