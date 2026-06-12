# tlouclothing

Nuxt 3 e-commerce site for **T.L.O.U. Clothing (The Last Of Us Clothing)** — streetwear in Tembisa.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Business content

- **Location:** 933 Winnie Mandela, Zone 10, Tembisa, Gauteng 1632
- **Phone/WhatsApp:** 079 943 4968
- **Email:** tlou.masoga1@gmail.com
- **Products:** Catalog in `data/tlou-products.ts` (6 items with prices)

## Add your logos & media

Copy your logo images into `public/`:

- `public/logo.png` — main T.L.O.U. logo (navbar & hero)
- `public/logo-badge.png` — circular badge (media gallery)

Optional:

- `public/media/welcome.mp3` — audio for the Media section
- Set `NUXT_PUBLIC_VIDEO_EMBED_URL` to a YouTube embed URL for the video block

## Project structure

- `pages/` — Home, Shop, About, Contact, Cart
- `components/` — Hero, features, catalog, media gallery
- `data/tlou-products.ts` — Product catalog (assignment prices)
