import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Cotton',
    description: 'Breathable & versatile',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop',
  },
  {
    name: 'Linen',
    description: 'Natural elegance',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=500&fit=crop',
  },
  {
    name: 'Silk',
    description: 'Luxurious drape',
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=400&h=500&fit=crop',
  },
  {
    name: 'Wool',
    description: 'Warmth & texture',
    image: 'https://images.unsplash.com/photo-1558171013-50af3cdffe5b?w=400&h=500&fit=crop',
  },
];

export function Categories() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Shop by Material
          </h2>
          <p className="mt-3 text-muted-foreground">
            Explore our diverse range of premium textiles
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="group relative aspect-[4/5] rounded-lg overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-cream">
                  {category.name}
                </h3>
                <p className="text-sm text-cream/70 mt-1">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
