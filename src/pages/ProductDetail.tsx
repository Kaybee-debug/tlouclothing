import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { sampleProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Minus, Plus, ArrowLeft, Check } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Product Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/products" className="mt-8 inline-block">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-elegant animate-fade-in">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            {product.category && (
              <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded mb-4">
                {product.category}
              </span>
            )}
            <h1 className="font-display text-4xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-primary font-semibold">
              ${product.price.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">per yard</span>
            </p>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mt-6 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="h-4 w-4 text-sage" />
                  <span className="text-sm text-sage">
                    In Stock ({product.stock} yards available)
                  </span>
                </>
              ) : (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity (yards):</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Features */}
            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-display font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-sage" />
                  Premium quality materials
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-sage" />
                  Sustainably sourced
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-sage" />
                  Easy care instructions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-sage" />
                  Free samples available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
