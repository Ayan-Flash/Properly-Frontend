'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface MultiStepPropertyFormProps {
  onClose: () => void;
}

export function MultiStepPropertyForm({ onClose }: MultiStepPropertyFormProps) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Property</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property Details</h3>
              
              <div>
                <Label>Property Name*</Label>
                <Input placeholder="Enter property name" className="mt-2" />
              </div>

              <div>
                <Label>Address*</Label>
                <Input placeholder="Enter address" className="mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City*</Label>
                  <Input placeholder="City" className="mt-2" />
                </div>
                <div>
                  <Label>Postal Code*</Label>
                  <Input placeholder="Postal Code" className="mt-2" />
                </div>
              </div>

              <div>
                <Label>Property Type*</Label>
                <Input placeholder="e.g., Residential" className="mt-2" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Financial Information</h3>
              
              <div>
                <Label>Market Value*</Label>
                <Input type="number" placeholder="Enter market value" className="mt-2" />
              </div>

              <div>
                <Label>Purchase Price</Label>
                <Input type="number" placeholder="Enter purchase price" className="mt-2" />
              </div>

              <div>
                <Label>Purchase Date</Label>
                <Input type="date" className="mt-2" />
              </div>

              <div>
                <Label>Ownership Type*</Label>
                <Input placeholder="e.g., Family Trust" className="mt-2" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Details</h3>
              
              <div>
                <Label>Number of Bedrooms</Label>
                <Input type="number" placeholder="Enter bedrooms" className="mt-2" />
              </div>

              <div>
                <Label>Number of Bathrooms</Label>
                <Input type="number" placeholder="Enter bathrooms" className="mt-2" />
              </div>

              <div>
                <Label>Property Size (sqm)</Label>
                <Input type="number" placeholder="Enter size" className="mt-2" />
              </div>

              <div>
                <Label>Notes</Label>
                <textarea 
                  className="w-full mt-2 p-2 border rounded-md min-h-[100px]"
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              onClick={() => step < 3 ? setStep(step + 1) : onClose()}
            >
              {step === 3 ? 'Save Property' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
