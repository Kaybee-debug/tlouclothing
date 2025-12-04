import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-500 animate-fade-up",
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      {/* Quick Actions Overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="flex gap-2">
          <Link to={`/products/${product.id}`}>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="hero"
            size="icon"
            className="rounded-full"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Badge */}
      {product.category && (
        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded">
          {product.category}
        </span>
      )}

      {/* Low Stock Badge */}
      {product.stock < 30 && (
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
          Low Stock
        </span>
      )}

      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">per yard</span>
        </div>
      </div>
    </div>
  );
}
