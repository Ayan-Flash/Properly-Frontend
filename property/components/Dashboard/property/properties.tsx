'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Search, Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MultiStepPropertyForm } from "@/components/Dashboard/property/MultiStepPropertyForm";

const properties = [
  {
    id: 1,
    name: "53 (LOT 307) Salvatore",
    address: "Gordonvale, QLD 4865",
    type: "Residential",
    status: "Subscribed",
    netIncome: "$0",
    marketValue: "$1,300,000",
    loan: "$220,000",
    lvr: "17%",
    ownership: "Family Trust",
    loans: 1,
  },
  {
    id: 2,
    name: "9 Sicilian Avenue",
    address: "Gordonvale, QLD 4865",
    type: "Residential",
    status: "Subscribed",
    netIncome: "-$6,471",
    marketValue: "$1,300,000",
    loan: "$558,000",
    lvr: "43%",
    ownership: "Family Trust",
    loans: 1,
  },
];

const Property = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  
  return (
    <>
      {showPropertyForm && (
        <MultiStepPropertyForm 
          onClose={() => setShowPropertyForm(false)}
        />
      )}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Your Property</h1>
              <p className="text-muted-foreground">Hey! All of your properties are listed here</p>
            </div>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setShowPropertyForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search Property" 
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="subscribed">Subscribed</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{property.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{property.type}</Badge>
                    <Badge className="bg-accent text-accent-foreground">{property.status}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Net Income</div>
                    <div className="font-semibold">{property.netIncome}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Market Value</div>
                    <div className="font-semibold">{property.marketValue}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Loan</div>
                    <div className="font-semibold">{property.loan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">LVR</div>
                    <div className="font-semibold">{property.lvr}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Ownership</div>
                    <div className="font-semibold">{property.ownership}</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-primary mb-2">Active Loans ({property.loans})</div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">ANZ</div>
                          <div className="text-sm text-muted-foreground">Account Number: XXXXX-XXXX8094</div>
                        </div>
                        <Badge variant="outline" className="ml-auto">Active</Badge>
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowPropertyForm(true)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Property
                      </Button>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Loan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Property;
