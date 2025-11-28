import { PropertyCard } from '@/components/properties/PropertyCard';

const properties = [
  {
    id: 1,
    name: '123 Main Street',
    address: 'San Francisco, CA 94105',
    units: 4,
    occupancy: 100,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: '456 Oak Avenue',
    address: 'San Francisco, CA 94105',
    units: 6,
    occupancy: 83,
    image: 'https://images.unsplash.com/photo-1575517114892-63f0433444b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: '789 Pine Road',
    address: 'San Francisco, CA 94105',
    units: 3,
    occupancy: 67,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
];

export function PropertyList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}