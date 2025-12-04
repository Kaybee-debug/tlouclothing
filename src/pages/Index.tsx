import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { Features } from '@/components/home/Features';
import { sampleProducts } from '@/data/products';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedProducts products={sampleProducts} />
      <Categories />
    </Layout>
  );
};

export default Index;
