'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types/database';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/transactions');
        // const data = await response.json();
        // setTransactions(data);
        
        // Mock data for demonstration
        const mockTransactions: Transaction[] = [
          {
            id: 1,
            date: new Date('2023-06-01'),
            propertyId: 1,
            tenantId: 1,
            description: 'Monthly Rent',
            amount: 1200,
            type: 'income',
            status: 'paid',
          },
          {
            id: 2,
            date: new Date('2023-06-01'),
            propertyId: 2,
            tenantId: 2,
            description: 'Monthly Rent',
            amount: 950,
            type: 'income',
            status: 'paid',
          },
          {
            id: 3,
            date: new Date('2023-06-10'),
            propertyId: 1,
            description: 'Plumbing repair',
            amount: 250,
            type: 'expense',
            status: 'paid',
          },
        ];
        
        setTransactions(mockTransactions);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, isLoading, error };
}