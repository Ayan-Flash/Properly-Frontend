import { TenantCard } from '@/components/tenants/TenantCard';

const tenants = [
  {
    id: 1,
    name: 'John Smith',
    property: '123 Main St',
    unit: 'Unit 1A',
    leaseEnd: '2023-12-31',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    property: '456 Oak Ave',
    unit: 'Unit 2B',
    leaseEnd: '2024-03-31',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Michael Brown',
    property: '789 Pine Rd',
    unit: 'Unit 3C',
    leaseEnd: '2023-09-30',
    status: 'Pending',
  },
];

export function TenantList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
}