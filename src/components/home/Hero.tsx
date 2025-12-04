import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&h=1080&fit=crop"
          alt="Fabric textures"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-cream/90 bg-cream/10 rounded-full border border-cream/20 mb-6">
            Premium Quality Since 1985
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight">
            Exquisite Fabrics for{' '}
            <span className="text-terracotta-light">Extraordinary</span> Creations
          </h1>
          <p className="mt-6 text-lg text-cream/80 max-w-lg">
            Discover our curated collection of premium textiles. From sustainable cottons 
            to luxurious silks, find the perfect fabric for your next masterpiece.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products">
              <Button variant="hero" size="xl">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="xl"
                className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
