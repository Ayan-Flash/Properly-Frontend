'use client';

import { useState, useEffect } from 'react';
import { Tenant } from '@/types/database';

export function useTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/tenants');
        // const data = await response.json();
        // setTenants(data);
        
        // Mock data for demonstration
        const mockTenants: Tenant[] = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '(555) 123-4567',
            propertyId: 1,
            unit: 'Unit 1A',
            leaseStart: new Date('2023-01-01'),
            leaseEnd: new Date('2023-12-31'),
            monthlyRent: 1200,
            status: 'active',
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '(555) 987-6543',
            propertyId: 2,
            unit: 'Unit 2B',
            leaseStart: new Date('2023-02-01'),
            leaseEnd: new Date('2024-01-31'),
            monthlyRent: 950,
            status: 'active',
          },
        ];
        
        setTenants(mockTenants);
      } catch (err) {
        setError('Failed to fetch tenants');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return { tenants, isLoading, error };
}