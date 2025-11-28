export function CashFlowChart() {
  // Mock data for the chart
  const data = [
    { month: 'Jan', cashflow: 7500 },
    { month: 'Feb', cashflow: 8200 },
    { month: 'Mar', cashflow: 7300 },
    { month: 'Apr', cashflow: 9100 },
    { month: 'May', cashflow: 8400 },
    { month: 'Jun', cashflow: 9250 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">Cash Flow Trend</h3>
      <div className="mt-4 h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500">{item.month}</div>
            <div
              className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors"
              style={{ height: `${(item.cashflow / 10000) * 100}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">${item.cashflow}</div>
          </div>
        ))}
      </div>
    </div>
  );
}