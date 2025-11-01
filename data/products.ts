/**
 * Products Data
 * Temporary seed data until Convex read is wired
 * Replace with actual product data from Figma
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'headphones' | 'speakers' | 'earphones';
  price: number;
  description: string;
  features: string[];
  includes: Array<{ quantity: number; item: string }>;
  gallery: {
    first: string;
    second: string;
    third: string;
  };
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new?: boolean;
  related?: string[]; // Array of product slugs
}

// Placeholder products - Replace with actual Figma data
export const products: Product[] = [
  // Add actual products here based on Figma design
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(productSlug: string): Product[] {
  const product = getProductBySlug(productSlug);
  if (!product?.related) return [];
  
  return product.related
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

