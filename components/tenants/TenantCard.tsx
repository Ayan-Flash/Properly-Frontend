export function TenantCard({ tenant }: { tenant: any }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{tenant.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{tenant.property} - {tenant.unit}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Lease ends: {tenant.leaseEnd}</p>
            <p className="text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                tenant.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {tenant.status}
              </span>
            </p>
          </div>
          <button className="rounded-md bg-white px-3 py-1 text-sm font-medium text-blue-600 shadow-sm hover:bg-gray-50">
            View
          </button>
        </div>
      </div>
    </div>
  );
}