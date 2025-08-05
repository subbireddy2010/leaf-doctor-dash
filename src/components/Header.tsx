import { Leaf, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">PlantCare AI</h1>
              <p className="text-sm text-muted-foreground">Disease Detection Dashboard</p>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/alerts">
            <Button variant="ghost" size="icon" title="View Alerts">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" title="User Profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;