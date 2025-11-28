
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Bank = () => {
  return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Bank Accounts</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
          
          <div className="text-center py-16 text-muted-foreground">
            <p>No bank accounts added yet</p>
            <p className="text-sm mt-2">Add your first bank account to get started</p>
          </div>
        </CardContent>
      </Card>
  );
};

export default Bank;
