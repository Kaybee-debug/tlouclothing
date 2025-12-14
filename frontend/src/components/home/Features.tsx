import { Truck, Shield, Leaf, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% satisfaction promise',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'Eco-friendly materials',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated fabric consultants',
  },
];

export function Features() {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
