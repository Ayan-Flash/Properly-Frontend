'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function IncomeForm() {
  const [date, setDate] = useState('');
  const [property, setProperty] = useState('');
  const [tenant, setTenant] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to an API
    console.log({ date, property, tenant, description, amount });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="property">Property</Label>
        <Select value={property} onValueChange={setProperty}>
          <SelectTrigger>
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="123-main-st">123 Main St</SelectItem>
            <SelectItem value="456-oak-ave">456 Oak Ave</SelectItem>
            <SelectItem value="789-pine-rd">789 Pine Rd</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tenant">Tenant</Label>
        <Select value={tenant} onValueChange={setTenant}>
          <SelectTrigger>
            <SelectValue placeholder="Select tenant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john-smith">John Smith</SelectItem>
            <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
            <SelectItem value="michael-brown">Michael Brown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <Button type="submit">Add Income</Button>
    </form>
  );
}