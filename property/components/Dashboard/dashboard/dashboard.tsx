
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Building2, Receipt } from "lucide-react";


interface DashboardProps {
  userName?: string;
  uniqueId?: string;
}

const Dashboard = ({ userName = 'User', uniqueId = 'ID-0000' }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hey {userName}! Welcome to the Dashboard!</h1>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Add Property
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            + Add Income / Expense
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Income (YTD)
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">-$51,402</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Income (Last FY)
            </CardTitle>
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">-$119,545</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Est Market Value
            </CardTitle>
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">$10,563,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Equity
            </CardTitle>
            <PiggyBank className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">$5,027,290</div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Balance and Interest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-primary text-primary-foreground bg-blue-500">
          <CardHeader>
            <CardTitle>Current Loan Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">$5,535,710</div>
            <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
              <div>
                <div className="text-sm opacity-90">Repayment</div>
                <div className="text-2xl font-bold">$2,488,856</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Overall Interest</div>
                <div className="text-2xl font-bold">5.93%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Fixed Interest</div>
              <div className="text-3xl font-bold text-blue-500">0.00%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Variable Interest</div>
              <div className="text-3xl font-bold text-blue-500">5.93%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Available Redraw</div>
              <div className="text-3xl font-bold text-blue-500">$0</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="p-2 bg-info/10 rounded-lg">
                <Building2 className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Connect Bank</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect Loan Account for automatic updates of interest and other charges.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <span>📍</span> 1/35 Hurley Street
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span> 31 Bimbadeen Circuit
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍</span> 2/35 Hurley Street
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-700 text-white">Connect</Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Rent Summary</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Advise your property manager to email monthly Rental Summary to {uniqueId}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <div>📍 85 Pioneer Drive</div>
                  <div>📍 39 Sicilian Avenue</div>
                  <div>📍 9 Sicilian Avenue</div>
                </div>
                <Button size="sm" variant="outline" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  Email Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transaction</CardTitle>
            <Button variant="link" className="text-primary">Add More +</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Interest on loans</div>
                    <div className="text-sm text-muted-foreground">31 Bimbadeen Circuit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-destructive">$0.01</div>
                  <div className="text-xs text-muted-foreground">17-11-2025</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Receipt className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Management fees</div>
                    <div className="text-sm text-muted-foreground">29 Bimbadeen Circuit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-destructive">$72.80</div>
                  <div className="text-xs text-muted-foreground">17-11-2025</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Council rates</div>
                    <div className="text-sm text-muted-foreground">29 Bimbadeen Circuit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-destructive">$504.97</div>
                  <div className="text-xs text-muted-foreground">17-11-2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default Dashboard;
