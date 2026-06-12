import type { Product } from '~/types'
import { buildCatalogFromGallery } from '~/data/tlou-gallery'

/** T.L.O.U. product photos — files in /public */
export const productImages = {
  sweater: '/tlou_sweater.png',
  cropHoodie: '/tlou_crophoodie_pink.png',
  tshirt: '/tlou_croptop.png',
  hoodie: '/tlou_hoodie.png',
  sweatpants: '/tlou_trackpants.png',
  tracksuitSet: '/tlou_sweater_set.png',
  hoodieSet: '/tlou_hoodie_set.png',
  cap: '/tlou_cap.png',
  hat: '/tlou_hat.png',
  fallback: '/tlou_hoodie.png',
} as const

/** Full catalog — one listing per product photo */
export const tlouProducts: Product[] = buildCatalogFromGallery()

/** Product categories for T.L.O.U. Clothing (admin + shop) — display order */
export const tlouCategoryNames = ['Caps', 'Hats', 'Sweaters', 'T-Shirts', 'Hoodies', 'Trackpants', 'Sets'] as const

/** Sort category names by tlouCategoryNames order, then any others A–Z */
export function sortTlouCategories(names: Iterable<string>) {
  const order = tlouCategoryNames as readonly string[]
  return [...new Set(names)].sort((a, b) => {
    const aRank = order.indexOf(a)
    const bRank = order.indexOf(b)
    const aOrder = aRank === -1 ? order.length + 1 : aRank
    const bOrder = bRank === -1 ? order.length + 1 : bRank
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.localeCompare(b)
  })
}

export const tlouCategories = [
  {
    name: 'Caps',
    description: 'Snapbacks, truckers & classic caps',
    image: productImages.cap,
  },
  {
    name: 'Hats',
    description: 'Street-style headwear',
    image: productImages.hat,
  },
  {
    name: 'Sweaters',
    description: 'Quality sweaters in assorted colours',
    image: productImages.sweater,
  },
  {
    name: 'T-Shirts',
    description: 'Crop tops & casual tees',
    image: productImages.tshirt,
  },
  {
    name: 'Hoodies',
    description: 'Classic & crop hoodies with hood',
    image: productImages.hoodie,
  },
  {
    name: 'Trackpants',
    description: 'Two-tone trackpants & joggers',
    image: productImages.sweatpants,
  },
  {
    name: 'All',
    description: 'View full catalog',
    image: productImages.hoodieSet,
  },
]
