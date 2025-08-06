
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const recentScans = [
  { id: 1, plant: "Tomato", result: "Healthy", time: "2 min ago", severity: "low" },
  { id: 2, plant: "Rose", result: "Powdery Mildew", time: "15 min ago", severity: "medium" },
  { id: 3, plant: "Lettuce", result: "Leaf Spot", time: "1 hour ago", severity: "high" },
  { id: 4, plant: "Cucumber", result: "Healthy", time: "2 hours ago", severity: "low" },
];

const RecentScans = () => {
  const severityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{scan.plant}</p>
                <p className="text-sm text-muted-foreground">{scan.result}</p>
              </div>
              <div className="text-right">
                <Badge className={severityColors[scan.severity as keyof typeof severityColors]}>
                  {scan.result}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {scan.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentScans;
