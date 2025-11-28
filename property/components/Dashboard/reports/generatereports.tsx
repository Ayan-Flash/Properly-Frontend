"use client";

import React from "react";

interface GenerateReportsProps {
  reportType: string;
  setReportType: (type: string) => void;
  reportScope: string;
  setReportScope: (scope: string) => void;
  property: string;
  setProperty: (property: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  year: string;
  setYear: (year: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  reportTypeTabs: { id: string; label: string }[];
  years: string[];
}

export default function GenerateReports({
  reportType,
  setReportType,
  reportScope,
  setReportScope,
  property,
  setProperty,
  duration,
  setDuration,
  year,
  setYear,
  selectedDate,
  setSelectedDate,
  reportTypeTabs,
  years,
}: GenerateReportsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-2 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Generate & Download Reports</h2>
      </div>

      <div className="p-0">
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Generate New Report</h3>

          {/* Report Type Tabs */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {reportTypeTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setReportType(t.id)}
                className={`px-4 py-2 rounded-full border text-sm w-full md:w-auto ${
                  reportType === t.id
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>

          {reportType === "loan" ? (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow"
                type="button"
                onClick={() => {
                  console.log("Generate Loan Summary Report");
                }}
              >
                Generate Report
              </button>
              <button
                className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-medium"
                type="button"
                onClick={() => {
                  console.log("Email Loan Summary Report");
                }}
              >
                Email Report
              </button>
            </div>
          ) : reportType === "cost" ? (
            <>
              <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div className="text-sm">
                  <label className="block text-gray-600 mb-2">Properties*</label>
                  <select
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="all">-- All --</option>
                    <option value="p1">Property 1</option>
                    <option value="p2">Property 2</option>
                  </select>
                </div>
                <div className="text-sm">
                  <label className="block text-gray-600 mb-2">Date*</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <button
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow"
                  type="button"
                  onClick={() => {
                    console.log("Generate Cost Base Report", { property, selectedDate });
                  }}
                >
                  Generate Report
                </button>
                <button
                  className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-medium"
                  type="button"
                  onClick={() => {
                    console.log("Email Cost Base Report");
                  }}
                >
                  Email Report
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">Report Scope</div>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="scope"
                        value="full"
                        checked={reportScope === "full"}
                        onChange={() => setReportScope("full")}
                      />
                      <span>Full Report</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="scope"
                        value="ownership"
                        checked={reportScope === "ownership"}
                        onChange={() => setReportScope("ownership")}
                      />
                      <span>Ownership Wise Report</span>
                    </label>
                  </div>
                </div>

                <div className="text-sm">
                  <label className="block text-gray-600 mb-2">Properties*</label>
                  <select
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="all">-- All --</option>
                    <option value="p1">Property 1</option>
                    <option value="p2">Property 2</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Choose Duration*</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option value="fy">Financial Year</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Select Year*</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <button
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow"
                  type="button"
                  onClick={() => {
                    console.log("Generate report", { reportType, reportScope, property, duration, year });
                  }}
                >
                  Generate Report
                </button>
                <button
                  className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900 font-medium"
                  type="button"
                  onClick={() => {
                    console.log("Email report");
                  }}
                >
                  Email Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}