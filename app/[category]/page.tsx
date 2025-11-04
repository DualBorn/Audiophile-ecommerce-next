import type { Metadata } from 'next'
import CategoryTemplate from '@/components/templates/CategoryPage'
import { getProductsByCategory, getCategories } from '@/lib/products'
import { Product } from '@/models/Product'

// Generate static params for all categories
export async function generateStaticParams() {
  const categories: string[] = getCategories()
  return categories.map((category) => ({
    category,
  }))
}

// Generate metadata for each category page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  return {
    title: `Audiophile shop - ${category}`,
  }
}

// Category page component
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const products: Product[] = getProductsByCategory(category)

  return <CategoryTemplate products={products} />
}

