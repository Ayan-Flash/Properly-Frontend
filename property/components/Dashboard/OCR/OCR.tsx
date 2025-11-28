'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExtractedData {
  id: number;
  fileName: string;
  uploadDate: string;
  documentType: string;
  extractedFields: {
    [key: string]: string;
  };
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
}

export default function OCRPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([
    {
      id: 1,
      fileName: 'receipt_electricity_nov.pdf',
      uploadDate: '2025-11-13',
      documentType: 'Receipt',
      extractedFields: {
        vendor: 'Pacific Gas & Electric',
        amount: '$245.67',
        date: '2025-11-01',
        invoiceNumber: 'INV-2025-11001',
      },
      confidence: 98.5,
      status: 'completed',
    },
    {
      id: 2,
      fileName: 'lease_agreement_tenant_1.pdf',
      uploadDate: '2025-11-12',
      documentType: 'Lease Agreement',
      extractedFields: {
        tenant: 'John Smith',
        property: '123 Main Street',
        monthlyRent: '$2,500',
        leaseStart: '2025-12-01',
        leaseEnd: '2026-11-30',
      },
      confidence: 95.2,
      status: 'completed',
    },
    {
      id: 3,
      fileName: 'invoice_repairs.jpg',
      uploadDate: '2025-11-10',
      documentType: 'Invoice',
      extractedFields: {
        vendor: 'ABC Plumbing Services',
        amount: '$850.00',
        date: '2025-11-08',
        description: 'Emergency pipe repair',
      },
      confidence: 92.8,
      status: 'completed',
    },
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate OCR processing
    setTimeout(() => {
      const newData: ExtractedData = {
        id: extractedData.length + 1,
        fileName: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        documentType: 'Document',
        extractedFields: {
          status: 'Processing...',
        },
        confidence: 0,
        status: 'processing',
      };
      setExtractedData([newData, ...extractedData]);
      setSelectedFile(null);
      setIsUploading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">OCR Document Processing</h1>
          <p className="text-gray-500">Extract data from receipts, invoices, and documents</p>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-500 font-medium">
                Upload a file
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </label>
            <p className="text-gray-500 text-sm mt-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PDF, JPG, PNG up to 10MB
          </p>
          {selectedFile && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-700">{selectedFile.name}</span>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isUploading ? 'Processing...' : 'Process Document'}
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Processed Documents</h2>
        {extractedData.map((data) => (
          <Card key={data.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{data.fileName}</h3>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(data.uploadDate).toLocaleDateString()} • Type: {data.documentType}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(data.status)}`}>
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </span>
                {data.status === 'completed' && (
                  <span className="text-xs text-gray-500">
                    {data.confidence}% confidence
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              {Object.entries(data.extractedFields).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs text-gray-500 uppercase">{key}</p>
                  <p className="text-sm font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
