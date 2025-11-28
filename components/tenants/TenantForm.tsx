'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TenantForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [property, setProperty] = useState('');
  const [unit, setUnit] = useState('');
  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, you would submit this data to an API
    setTimeout(() => {
      setIsLoading(false);
      console.log({ name, email, phone, property, unit, leaseStart, leaseEnd, monthlyRent });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="leaseStart">Lease Start</Label>
          <Input
            id="leaseStart"
            type="date"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="leaseEnd">Lease End</Label>
          <Input
            id="leaseEnd"
            type="date"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyRent">Monthly Rent</Label>
        <Input
          id="monthlyRent"
          type="number"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Tenant'}
      </Button>
    </form>
  );
}