import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Fabric manufacturing"
          className="w-full h-full object-cover"
        />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 via-white/20 to-white/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl animate-fade-up">
         <span className="inline-block px-4 py-1.5 text-sm font-medium text-black/80 bg-orange-600 rounded-full border  mb-6">
  Premium Quality Since 1985
</span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            Exquisite Fabrics for{' '}
            <span className="text-black-400">Extraordinary</span> Creations
          </h1>
          <p className="mt-6 text-lg text-black/70 max-w-lg">
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
                className="border-black/30 text-black hover:bg-black/10 hover:text-black"
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
