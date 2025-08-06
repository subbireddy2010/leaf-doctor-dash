
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  trendColor: "success" | "warning" | "danger";
  href?: string;
}

const StatsCard = ({ icon: Icon, title, value, trend, trendColor, href }: StatsCardProps) => {
  const trendColors = {
    success: "text-green-600",
    warning: "text-yellow-600", 
    danger: "text-red-600"
  };

  const CardContent_Component = (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className={`text-xs ${trendColors[trendColor]}`}>{trend}</p>
          </div>
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {CardContent_Component}
      </Link>
    );
  }

  return CardContent_Component;
};

export default StatsCard;
