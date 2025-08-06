
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi } from "lucide-react";

const RealTimeMonitoring = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Real-time Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <Wifi className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-sm font-medium">System Status</p>
            <Badge className="bg-green-100 text-green-800">Online</Badge>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Activity className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm font-medium">Active Scans</p>
            <p className="text-2xl font-bold">23</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-muted-foreground">Latest scan: Tomato plant - Healthy (95% confidence)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeMonitoring;
