
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell } from "lucide-react";

const alerts = [
  { id: 1, message: "High disease activity in Sector A", severity: "high", time: "5 min ago" },
  { id: 2, message: "Accuracy dropped below 90%", severity: "medium", time: "1 hour ago" },
  { id: 3, message: "New disease pattern detected", severity: "low", time: "2 hours ago" },
];

const AlertSystem = () => {
  const severityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{alert.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge className={severityColors[alert.severity as keyof typeof severityColors]}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertSystem;
