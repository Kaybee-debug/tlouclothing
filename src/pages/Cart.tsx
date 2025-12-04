import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Your Cart is Empty
            </h1>
            <p className="mt-4 text-muted-foreground">
              Looks like you haven't added any fabrics to your cart yet.
            </p>
            <Link to="/products" className="mt-8 inline-block">
              <Button variant="hero" size="lg">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 md:gap-6 p-4 bg-card rounded-lg shadow-elegant animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <Link
                  to={`/products/${item.product.id}`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden flex-shrink-0"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.product.id}`}>
                    <h3 className="font-display font-semibold text-lg text-foreground hover:text-primary transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    ${item.product.price.toFixed(2)} per yard
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-secondary/50 rounded-lg p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {totalPrice >= 100 ? 'Free' : '$9.99'}
                  </span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">
                    ${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {totalPrice < 100 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link to="/checkout" className="block mt-6">
                <Button variant="hero" size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                to="/products"
                className="block mt-4 text-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
