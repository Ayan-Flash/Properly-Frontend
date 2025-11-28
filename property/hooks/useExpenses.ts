'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types/database';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/expenses');
        // const data = await response.json();
        // setExpenses(data);
        
        // Mock data for demonstration
        const mockExpenses: Expense[] = [
          {
            id: 1,
            date: new Date('2023-06-10'),
            propertyId: 1,
            categoryId: 1,
            description: 'Plumbing repair',
            amount: 250,
            status: 'paid',
          },
          {
            id: 2,
            date: new Date('2023-06-05'),
            propertyId: 2,
            categoryId: 2,
            description: 'Electricity bill',
            amount: 180,
            status: 'paid',
          },
        ];
        
        setExpenses(mockExpenses);
      } catch (err) {
        setError('Failed to fetch expenses');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return { expenses, isLoading, error };
}