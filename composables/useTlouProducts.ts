import { tlouProducts, sortTlouCategories } from '~/data/tlou-products'
import type { Product } from '~/types'

export const useTlouProducts = () => {
  const products = ref<Product[]>([...tlouProducts])

  const getProductById = (id: string) =>
    products.value.find((p) => String(p.id) === String(id))

  const getFeatured = (limit = 4) => products.value.slice(0, limit)

  const categories = computed(() =>
    sortTlouCategories(products.value.map((p) => p.category).filter(Boolean) as string[])
  )

  return { products, getProductById, getFeatured, categories }
}
