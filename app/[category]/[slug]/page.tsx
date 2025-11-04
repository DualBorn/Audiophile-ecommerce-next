import type { Metadata } from 'next'
import { getProductsPaths, getProductBySlug } from '@/lib/products'
import { Product } from '@/models/Product'
import ProductPageTemplate from '@/components/templates/ProductPage'

// Generate static params for all products
export async function generateStaticParams() {
  const paths = getProductsPaths()
  return paths.map((path: { category: string; slug: string }) => ({
    category: path.category,
    slug: path.slug,
  }))
}

// Generate metadata for each product page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product: Product | undefined = getProductBySlug(slug)
  
  return {
    title: product ? `Audiophile shop - ${product.name}` : 'Audiophile shop - Product',
  }
}

// Product page component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
  const product: Product | undefined = getProductBySlug(slug)

  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductPageTemplate product={product} />
}

