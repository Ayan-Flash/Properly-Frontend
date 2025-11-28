'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/database';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/properties');
        // const data = await response.json();
        // setProperties(data);
        
        // Mock data for demonstration
        const mockProperties: Property[] = [
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
        
        setProperties(mockProperties);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, isLoading, error };
}