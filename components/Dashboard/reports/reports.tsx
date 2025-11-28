"use client";
import React, { useState } from "react";

export default function ReportsContent() {
  const [reportType, setReportType] = useState("income");
  const [reportScope, setReportScope] = useState("full");
  const [property, setProperty] = useState("all");
  const [duration, setDuration] = useState("fy");
  const [year, setYear] = useState("FY 24-25");
  const [date, setDate] = useState("");

  const reportTypeTabs = [
    { id: "income", label: "Income & Expenditure" },
    { id: "cost", label: "Cost Base" },
    { id: "loan", label: "Loan Summary" },
  ];

  const years = ["FY 25-26", "FY 24-25", "FY 23-24", "FY 22-23"];

  const isCostBase = reportType === "cost";
  const isLoan = reportType === "loan";

  return (
    <main className="flex-1 overflow-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        {/* Left Column */}
        <div className="col-span-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Generate & Download Reports</h2>
            </div>

            <div className="p-6">
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Generate New Report</h3>

                {/* Report Type Tabs */}
                <div className="flex items-center gap-3 mb-4">
                  {reportTypeTabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setReportType(t.id)}
                      className={`px-4 py-2 rounded-full border text-sm ${
                        reportType === t.id
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {!isLoan && (
                  <>
                    {/* Report Scope */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600 mb-2">Report Scope</div>
                        <div className="flex items-center gap-4">
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input type="radio" checked={reportScope === "full"} onChange={() => setReportScope("full")} />
                            <span>Full Report</span>
                          </label>

                          <label className="inline-flex items-center gap-2 text-sm">
                            <input type="radio" checked={reportScope === "ownership"} onChange={() => setReportScope("ownership")} />
                            <span>Ownership Wise Report</span>
                          </label>
                        </div>
                      </div>

                      {/* Properties */}
                      <div className="text-sm">
                        <label className="block text-gray-600 mb-2">Properties*</label>
                        <select value={property} onChange={(e) => setProperty(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
                          <option value="all">-- All --</option>
                          <option value="p1">Property 1</option>
                          <option value="p2">Property 2</option>
                        </select>
                      </div>
                    </div>

                    {/* Cost Base Mode */}
                    {isCostBase ? (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Date*</label>
                        <input
                          type="date"
                          className="border px-3 py-2 rounded w-full text-sm"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Choose Duration*</label>
                          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
                            <option value="fy">Financial Year</option>
                            <option value="month">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Select Year*</label>
                          <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
                            {years.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex items-center gap-4">
                      <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow">Generate Report</button>
                      <button className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-medium">Email Report</button>
                    </div>
                  </>
                )}

                {isLoan && (
                  <div className="mt-6">
                    <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow">Generate PDF</button>
                  </div>
                )}

              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">Quick Info</div>
            <div className="bg-white p-4 rounded border">Export Options</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          <div className="space-y-4">

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Download Documents</h4>
              <ul className="space-y-2">
                <li className="flex items-center justify-between p-3 rounded-md bg-gray-50"><span className="text-sm">Bank Statement</span><span>→</span></li>
                <li className="flex items-center justify-between p-3 rounded-md bg-gray-50"><span className="text-sm">Documents</span><span>→</span></li>
                <li className="flex items-center justify-between p-3 rounded-md bg-gray-50"><span className="text-sm">ATO Audit Supporting</span><span>→</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-h-[420px] overflow-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Download Tax Supportings</h4>
              <div className="space-y-3">
                {years.map((y) => (
                  <div key={y} className="flex items-center justify-between p-3 rounded-md bg-gray-50">
                    <div>
                      <div className="text-sm font-medium">{y}</div>
                      <div className="text-xs text-gray-500">Lock to download supporting files</div>
                    </div>
                    <button className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Lock</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Download Attachments</h4>
              <p className="text-sm text-gray-500">Bank statements, ATO supporting files and other attachments available for export.</p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}