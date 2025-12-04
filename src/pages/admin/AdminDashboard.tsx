import { AdminLayout } from '@/components/admin/AdminLayout';
import { sampleProducts } from '@/data/products';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Products',
    value: sampleProducts.length,
    icon: Package,
    change: '+2 this week',
  },
  {
    label: 'Total Orders',
    value: 24,
    icon: ShoppingCart,
    change: '+5 this week',
  },
  {
    label: 'Revenue',
    value: '$4,589',
    icon: DollarSign,
    change: '+12% from last month',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    icon: TrendingUp,
    change: '+0.5% from last month',
  },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-lg p-6 shadow-elegant animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-sage mt-1">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h2 className="font-display text-lg font-semibold mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">Order #AF-{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">
                      2 items • $89.98
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-sage/10 text-sage">
                    Paid
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h2 className="font-display text-lg font-semibold mb-4">
              Low Stock Alert
            </h2>
            <div className="space-y-4">
              {sampleProducts
                .filter(p => p.stock < 40)
                .slice(0, 3)
                .map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.stock} yards left
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      Low Stock
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
