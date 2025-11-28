'use client';

import { useState, useEffect, createContext, useContext } from 'react';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: '123 Main Street',
    address: 'San Francisco, CA 94105',
    units: 4,
    occupancy: 100,
  },
  {
    id: 2,
    name: '456 Oak Avenue',
    address: 'San Francisco, CA 94105',
    units: 6,
    occupancy: 83,
  },
  {
    id: 3,
    name: '789 Pine Road',
    address: 'San Francisco, CA 94105',
    units: 3,
    occupancy: 67,
  },
];

// Mock data for tenants
const mockTenants = [
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

type QueryContextType = {
  properties: typeof mockProperties;
  tenants: typeof mockTenants;
  isLoading: boolean;
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    properties: mockProperties,
    tenants: mockTenants,
    isLoading,
  };

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
}

export function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
}