# React to Nuxt 3 Conversion Guide

## ✅ What's Been Converted

### Core Structure
- ✅ Nuxt 3 configuration (`nuxt.config.ts`)
- ✅ Package.json with Nuxt dependencies
- ✅ TypeScript types (`types/index.ts`)
- ✅ Tailwind CSS configuration

### State Management (React Context → Pinia)
- ✅ `useAuth` composable (replaces AuthContext)
- ✅ `useCart` composable (replaces CartContext)
- ✅ Pinia stores with proper reactivity

### Routing (React Router → Nuxt File-based)
- ✅ `/` → `pages/index.vue`
- ✅ `/products` → `pages/products/index.vue`
- ✅ `/products/:id` → `pages/products/[id].vue`
- ✅ `/cart` → `pages/cart.vue`
- ✅ `/checkout` → `pages/checkout.vue` (protected)
- ✅ `/auth` → `pages/auth.vue`
- ✅ `/admin` → `pages/admin/index.vue` (admin protected)

### Middleware
- ✅ `middleware/auth.ts` - Protects authenticated routes
- ✅ `middleware/admin.ts` - Protects admin routes

### Components
- ✅ `LayoutNavbar.vue` - Navigation bar
- ✅ `LayoutFooter.vue` - Footer
- ✅ `ProductCard.vue` - Product card component
- ✅ `HomeHero.vue` - Hero section
- ✅ `HomeCategories.vue` - Categories section
- ✅ `HomeFeaturedProducts.vue` - Featured products
- ✅ `HomeFeatures.vue` - Features section

### API & Utilities
- ✅ `useApi` composable (replaces `lib/api.ts`)
- ✅ UUID utility function (browser-compatible)

## 🚀 Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Development
```bash
npm run dev
```
Visit `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy
The build output will be in `.output/public/` for static hosting or `.output/server/` for SSR.

For PM2 deployment:
```bash
pm2 start .output/server/index.mjs --name Xisekelo
```

## 📝 Key Differences from React

1. **File-based Routing**: No need for `<Routes>` - Nuxt automatically creates routes from `pages/` directory
2. **Composables**: Use `useAuth()`, `useCart()`, `useApi()` instead of React Context
3. **Vue Syntax**: Use `<template>`, `<script setup>`, and Vue directives instead of JSX
4. **SSR**: Nuxt supports Server-Side Rendering out of the box
5. **Auto-imports**: Nuxt auto-imports composables, components, and utilities

## 🔧 Configuration

### API URL
Set in `nuxt.config.ts` or via environment variable:
```bash
NUXT_PUBLIC_API_URL=http://10.0.0.86:3003
```

### Port
Default is 3000. Change in `nuxt.config.ts` or via:
```bash
PORT=3014 npm run dev
```

## ⚠️ Still TODO

- [ ] Convert remaining UI components (shadcn-vue instead of shadcn-react)
- [ ] Add toast notifications (replace React toast with Vue equivalent)
- [ ] Implement checkout page fully
- [ ] Add admin pages (products, orders, dashboard)
- [ ] Add about page
- [ ] Add payment success/failed pages
- [ ] Add 404 page

## 📚 Resources

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue 3 Docs](https://vuejs.org/)


