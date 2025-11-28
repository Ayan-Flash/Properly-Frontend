'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/database';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API or auth provider
        // const response = await fetch('/api/user');
        // const data = await response.json();
        // setUser(data);
        
        // Mock data for demonstration
        const mockUser: User = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'admin',
        };
        
        setUser(mockUser);
      } catch (err) {
        setError('Failed to fetch user');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, you would authenticate with your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      // setUser(data.user);
      
      // Mock login for demonstration
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'admin',
      };
      
      setUser(mockUser);
      return { success: true };
    } catch (err) {
      setError('Failed to login');
      console.error(err);
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would logout with your backend
      // await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      setError('Failed to logout');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, error, login, logout };
}