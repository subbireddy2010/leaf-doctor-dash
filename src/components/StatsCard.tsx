import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  trendColor?: "success" | "warning" | "destructive";
  href?: string;
}

const StatsCard = ({ icon: Icon, title, value, trend, trendColor = "success", href }: StatsCardProps) => {
  const trendColors = {
    success: "text-success",
    warning: "text-warning", 
    destructive: "text-destructive"
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link to={href} className="block">
          <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
            {children}
          </Card>
        </Link>
      );
    }
    return (
      <Card className="hover:shadow-md transition-shadow">
        {children}
      </Card>
    );
  };

  return (
    <CardWrapper>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-sm ${trendColors[trendColor]}`}>
                {trend}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </CardWrapper>
  );
};

export default StatsCard;