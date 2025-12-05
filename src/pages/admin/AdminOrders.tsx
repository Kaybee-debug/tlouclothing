import { AdminLayout } from '@/components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockOrders = [
  {
    id: 'AF-1001',
    customer: 'John Smith',
    email: 'john@example.com',
    items: 3,
    total: 129.97,
    status: 'paid',
    date: '2024-01-15',
  },
  {
    id: 'AF-1002',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    items: 2,
    total: 89.98,
    status: 'paid',
    date: '2024-01-14',
  },
  {
    id: 'AF-1003',
    customer: 'Mike Davis',
    email: 'mike@example.com',
    items: 1,
    total: 54.99,
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: 'AF-1004',
    customer: 'Emily Brown',
    email: 'emily@example.com',
    items: 5,
    total: 234.95,
    status: 'paid',
    date: '2024-01-13',
  },
  {
    id: 'AF-1005',
    customer: 'Chris Wilson',
    email: 'chris@example.com',
    items: 2,
    total: 149.98,
    status: 'failed',
    date: '2024-01-13',
  },
];

const statusStyles = {
  paid: 'bg-sage/10 text-sage hover:bg-sage/20',
  pending: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  failed: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
};

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage customer orders
          </p>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-lg shadow-elegant overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right font-medium">
                    R{order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        statusStyles[order.status as keyof typeof statusStyles]
                      }
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
