export function PropertyCard({ property }: { property: any }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="h-48 bg-gray-200">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{property.address}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{property.units} units</p>
            <p className="text-sm text-gray-500">Occupancy: {property.occupancy}%</p>
          </div>
          <button className="rounded-md bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-sm hover:bg-gray-50">
            View
          </button>
        </div>
      </div>
    </div>
  );
}