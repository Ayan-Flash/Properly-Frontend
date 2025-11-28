export function ExpenseChart() {
  // Mock data for the chart
  const data = [
    { month: 'Jan', expense: 2500 },
    { month: 'Feb', expense: 2800 },
    { month: 'Mar', expense: 3200 },
    { month: 'Apr', expense: 2900 },
    { month: 'May', expense: 3100 },
    { month: 'Jun', expense: 3200 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">Expense Trend</h3>
      <div className="mt-4 h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500">{item.month}</div>
            <div
              className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors"
              style={{ height: `${(item.expense / 3500) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">${item.expense}</div>
          </div>
        ))}
      </div>
    </div>
  );
}