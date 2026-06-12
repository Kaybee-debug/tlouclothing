import type { Product } from '~/types'

type GalleryItem = {
  src: string
  alt: string
  category: string
}

/** All T.L.O.U. product photos in /public */
export const tlouGallery: readonly GalleryItem[] = [
  { src: '/tlou_hoodie.png', alt: 'T.L.O.U. hoodie', category: 'Hoodies' },
  { src: '/tlou_hoodie_beige.png', alt: 'Beige hoodie', category: 'Hoodies' },
  { src: '/tlou_hoodie_olive.png', alt: 'Olive hoodie', category: 'Hoodies' },
  { src: '/tlou_hoodie_burgundy_back.png', alt: 'Burgundy hoodie — back', category: 'Hoodies' },
  { src: '/tlou_crophoodie_pink.png', alt: 'Pink crop hoodie', category: 'Hoodies' },
  { src: '/tlou_croptop.png', alt: 'Crop top T-shirt', category: 'T-Shirts' },
  { src: '/tlou_croptop_gray.png', alt: 'Grey crop top T-shirt', category: 'T-Shirts' },
  { src: '/tlou_croptop_black_gold.png', alt: 'Black & gold crop top T-shirt', category: 'T-Shirts' },
  { src: '/tlou_sweater.png', alt: 'T.L.O.U. sweater', category: 'Sweaters' },
  { src: '/tlou_sweater_navy.png', alt: 'Navy sweater', category: 'Sweaters' },
  { src: '/tlou_sweater_gray.png', alt: 'Grey sweater', category: 'Sweaters' },
  { src: '/tlou_trackpants.png', alt: 'Trackpants', category: 'Trackpants' },
  { src: '/tlou_trackpants_gray.png', alt: 'Grey trackpants', category: 'Trackpants' },
  { src: '/tlou_trackpants_cream.png', alt: 'Cream trackpants', category: 'Trackpants' },
  { src: '/tlou_hoodie_set.png', alt: 'Hoodie & trackpants set', category: 'Sets' },
  { src: '/tlou_sweater_set.png', alt: 'Sweater & trackpants set', category: 'Sets' },
  { src: '/tlou_set_gray.png', alt: 'Grey tracksuit set', category: 'Sets' },
  { src: '/tlou_set_olive.png', alt: 'Olive tracksuit set', category: 'Sets' },
  { src: '/tlou_set_pink.png', alt: 'Pink tracksuit set', category: 'Sets' },
  { src: '/tlou_cap.png', alt: 'T.L.O.U. cap', category: 'Caps' },
  { src: '/tlou_cap_white.png', alt: 'White cap', category: 'Caps' },
  { src: '/tlou_cap_navy_snapback.png', alt: 'Navy snapback cap', category: 'Caps' },
  { src: '/tlou_cap_trucker_beige.png', alt: 'Beige trucker cap', category: 'Caps' },
  { src: '/tlou_hat.png', alt: 'T.L.O.U. hat', category: 'Hats' },
  { src: '/tlou_hat_beige.png', alt: 'Beige hat', category: 'Hats' },
  { src: '/tlou_hat_olive.png', alt: 'Olive hat', category: 'Hats' },
]

const categoryPrices: Record<string, number> = {
  Caps: 150,
  Hats: 180,
  Sweaters: 330,
  'T-Shirts': 280,
  Hoodies: 350,
  Trackpants: 280,
  Sets: 590,
}

function priceForItem(src: string, category: string): number {
  const s = src.toLowerCase()
  if (category === 'Hoodies' && s.includes('crophoodie')) return 320
  if (category === 'Sets') {
    if (s.includes('hoodie_set')) return 600
    if (s.includes('sweater_set')) return 580
    return categoryPrices.Sets
  }
  return categoryPrices[category] ?? 300
}

/** One shop listing per photo in /public */
export function buildCatalogFromGallery(): Product[] {
  return tlouGallery.map((item, index) => ({
    id: String(index + 1),
    name: item.alt,
    description: `${item.alt} — available at our Tembisa stall. WhatsApp us to confirm size and colour.`,
    price: priceForItem(item.src, item.category),
    stock: 25,
    category: item.category,
    image_url: item.src,
  }))
}

/** Each catalog item is its own photo */
export const productGalleryById: Record<string, readonly string[]> = Object.fromEntries(
  tlouGallery.map((item, index) => [String(index + 1), [item.src]])
)

export function getProductGallery(productId: string, mainImage?: string) {
  const images = productGalleryById[productId]
  if (images?.length) return [...images]
  return mainImage ? [mainImage] : []
}
