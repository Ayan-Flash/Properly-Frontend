export function IncomeChart() {
  // Mock data for the chart
  const data = [
    { month: 'Jan', income: 10000 },
    { month: 'Feb', income: 11000 },
    { month: 'Mar', income: 10500 },
    { month: 'Apr', income: 12000 },
    { month: 'May', income: 11500 },
    { month: 'Jun', income: 12450 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">Income Trend</h3>
      <div className="mt-4 h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500">{item.month}</div>
            <div
              className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
              style={{ height: `${(item.income / 13000) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">${item.income}</div>
          </div>
        ))}
      </div>
    </div>
  );
}