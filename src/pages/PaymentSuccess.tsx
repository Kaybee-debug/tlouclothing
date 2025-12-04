import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <Layout>
      <div className="container py-20">
        <div className="max-w-lg mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/10 text-sage mb-8">
            <CheckCircle className="h-10 w-10" />
          </div>

          <h1 className="font-display text-4xl font-bold text-foreground">
            Payment Successful!
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>

          <div className="mt-8 p-6 bg-secondary/50 rounded-lg text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold">Order #AF-{Date.now().toString().slice(-6)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your fabrics will be carefully packaged and shipped within 2-3 business days.
              You'll receive tracking information via email once your order ships.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="hero" size="lg">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
