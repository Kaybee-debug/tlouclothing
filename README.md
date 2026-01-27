# Xiselo Safety - Nuxt 3 E-commerce

Premium textile e-commerce application built with Nuxt 3.

## Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `pages/` - File-based routing (Nuxt automatically creates routes)
- `components/` - Vue components
- `composables/` - Reusable composables (useAuth, useCart, useApi)
- `middleware/` - Route middleware (auth, admin)
- `layouts/` - Layout components
- `types/` - TypeScript type definitions

## Features

- Product catalog with detail pages
- Shopping cart
- User authentication
- Admin dashboard (protected routes)
- Responsive design with Tailwind CSS

## API Configuration

Set `NUXT_PUBLIC_API_URL` environment variable or it defaults to `http://10.0.0.86:3003`
