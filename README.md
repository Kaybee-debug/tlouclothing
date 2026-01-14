# Xiselo Safety - Nuxt 3 E-commerce Application

This is a Nuxt 3 e-commerce application for Xiselo Safety, converted from React + Vite.

## Technologies

- **Nuxt 3** - Vue.js framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **VueUse** - Vue composition utilities
- **Sonner** - Toast notifications
- **Lucide Vue** - Icons

## Project Structure

```
├── assets/          # CSS and static assets
├── components/      # Vue components
│   ├── ui/         # UI components (buttons, inputs, etc.)
│   ├── layout/     # Layout components (Navbar, Footer)
│   ├── home/       # Home page components
│   └── products/   # Product-related components
├── composables/     # Vue composables (useAuth, useCart)
├── data/           # Static data
├── layouts/        # Layout templates
├── middleware/     # Route middleware (auth, admin)
├── pages/          # Pages (auto-routing)
├── plugins/        # Nuxt plugins
├── public/          # Public assets
└── types/          # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 👤 User authentication (demo mode)
- 🔐 Protected routes
- 👨‍💼 Admin dashboard
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Demo Credentials

**Admin:**
- Email: `admin@fabric.com`
- Password: `admin123`

**Customer:**
- Email: `john@example.com`
- Password: `customer123`

## Development

The app runs on `http://localhost:3000` by default.

### Backend API

The frontend expects a backend API running on `http://localhost:5000`. Update the API URL in:
- `nuxt.config.ts` (runtimeConfig)
- `pages/products/index.vue` (fetch URL)

## Deployment

Build the application:

```bash
npm run build
```

The output will be in the `.output` directory.

For static hosting:

```bash
npm run generate
```

This creates a static site in the `.output/public` directory.

## Notes

- Authentication is currently in demo mode (localStorage-based)
- Cart data persists in localStorage
- Product data can be fetched from backend API or uses fallback sample data
