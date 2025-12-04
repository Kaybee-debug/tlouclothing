import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured Collection
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Hand-picked selections of our finest fabrics, perfect for your next creative project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button variant="default" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
