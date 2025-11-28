// Database types for the property manager application

export interface Property {
  id: number;
  name: string;
  address: string;
  units: number;
  occupancy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Tenant {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  propertyId: number;
  unit: string;
  leaseStart: Date;
  leaseEnd: Date;
  monthlyRent: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Transaction {
  id: number;
  date: Date;
  propertyId: number;
  tenantId?: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'pending' | 'paid' | 'cancelled';
  categoryId?: number;
  receiptUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Expense {
  id: number;
  date: Date;
  propertyId: number;
  categoryId: number;
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  receiptUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Document {
  id: number;
  name: string;
  propertyId?: number;
  tenantId?: number;
  type: 'lease' | 'invoice' | 'receipt' | 'other';
  url: string;
  uploadedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  createdAt?: Date;
  updatedAt?: Date;
}