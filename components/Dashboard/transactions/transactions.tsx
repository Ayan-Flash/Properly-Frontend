
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ArrowLeft } from "lucide-react";

const Transactions = () => {
  return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Record Expense</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left side - File Upload */}
          <Card>
            <CardContent className="p-6">
              <div className="border-2 border-dashed rounded-lg p-16 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Click or drag file to this area to upload (.jpg, .jpeg, .png, .pdf)</p>
              </div>
            </CardContent>
          </Card>

          {/* Right side - Form */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expense Date*</Label>
                    <Input type="date" defaultValue="2025-11-18" className="mt-2" />
                  </div>
                  
                  <div>
                    <Label>Select Property*</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Property" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prop1">Property 1</SelectItem>
                        <SelectItem value="prop2">Property 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Select Category*</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Income</div>
                        <SelectItem value="rental-income">Rental Income</SelectItem>
                        <SelectItem value="other-rental-income">Other rental related income</SelectItem>
                        <SelectItem value="variable-outgoings">Variable Outgoings Received</SelectItem>
                        
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Expense</div>
                        <SelectItem value="council-rates">Council rates</SelectItem>
                        <SelectItem value="water-rates">Water Rates</SelectItem>
                        <SelectItem value="gardening">Gardening</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="repairs">Repairs & Maintenance</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="pest-control">Pest Control</SelectItem>
                        <SelectItem value="property-management">Property Management Fees</SelectItem>
                        <SelectItem value="strata">Strata Fees</SelectItem>
                        <SelectItem value="interest">Interest on Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Amount Inclusive GST*</Label>
                    <Input placeholder="Amount" type="number" className="mt-2" />
                  </div>
                </div>

                <Button className="w-full mt-6">Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Transactions;
