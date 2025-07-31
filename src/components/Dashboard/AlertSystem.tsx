import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  location?: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    severity: "critical",
    title: "Bacterial Blight Outbreak",
    description: "New outbreak detected in greenhouse sector B. Immediate action required.",
    timestamp: "5 minutes ago",
    location: "Greenhouse B"
  },
  {
    id: "2",
    severity: "warning",
    title: "High Disease Risk",
    description: "Weather conditions favor fungal infections. Monitor closely.",
    timestamp: "2 hours ago"
  },
  {
    id: "3",
    severity: "info",
    title: "Weekly Report Ready",
    description: "Plant health analysis report for week 47 is now available.",
    timestamp: "1 day ago"
  }
];

export default function AlertSystem() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "warning";
      case "info": return "secondary";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical": return AlertTriangle;
      case "warning": return TrendingDown;
      case "info": return Activity;
      default: return Clock;
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Real-time Alerts
        </CardTitle>
        <CardDescription>
          Critical disease notifications and system alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const SeverityIcon = getSeverityIcon(alert.severity);
            return (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-4 rounded-lg border border-border/50 hover:bg-accent/20 transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  alert.severity === "critical" 
                    ? "bg-destructive/20 text-destructive" 
                    : alert.severity === "warning"
                    ? "bg-yellow-500/20 text-yellow-600"
                    : "bg-primary/20 text-primary"
                }`}>
                  <SeverityIcon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{alert.title}</h4>
                    <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </span>
                      {alert.location && (
                        <span className="flex items-center gap-1">
                          📍 {alert.location}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="text-xs"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}