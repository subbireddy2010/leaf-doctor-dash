import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity } from "lucide-react";

const realTimeData = [
  { time: "00:00", healthy: 945, diseased: 55, scanning: 12 },
  { time: "04:00", healthy: 948, diseased: 52, scanning: 8 },
  { time: "08:00", healthy: 952, diseased: 48, scanning: 15 },
  { time: "12:00", healthy: 955, diseased: 45, scanning: 23 },
  { time: "16:00", healthy: 959, diseased: 41, scanning: 18 },
  { time: "20:00", healthy: 962, diseased: 38, scanning: 14 },
  { time: "24:00", healthy: 965, diseased: 35, scanning: 10 },
];

const chartConfig = {
  healthy: {
    label: "Healthy Plants",
    color: "hsl(142, 76%, 36%)",
  },
  diseased: {
    label: "Diseased Plants",
    color: "hsl(var(--destructive))",
  },
  scanning: {
    label: "Currently Scanning",
    color: "hsl(var(--primary))",
  },
};

export default function RealTimeMonitoring() {
  const currentStats = {
    totalPlants: 1000,
    healthy: 965,
    diseased: 35,
    activeScans: 10,
    trend: "+2.3%"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Real-time Monitoring
        </CardTitle>
        <CardDescription>
          Live plant health status across all monitored areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Status Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <div className="text-2xl font-bold text-primary font-mono">
              {currentStats.totalPlants.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Plants</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold text-green-600 font-mono">
              {currentStats.healthy}
            </div>
            <div className="text-xs text-muted-foreground">Healthy</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-2xl font-bold text-destructive font-mono">
              {currentStats.diseased}
            </div>
            <div className="text-xs text-muted-foreground">Diseased</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-blue-500/10">
            <div className="text-2xl font-bold text-blue-600 font-mono">
              {currentStats.activeScans}
            </div>
            <div className="text-xs text-muted-foreground">Active Scans</div>
          </div>
        </div>

        {/* Live Chart */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">24-Hour Trend</h4>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {currentStats.trend}
            </Badge>
          </div>
          
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="healthy"
                  stackId="1"
                  stroke="hsl(142, 76%, 36%)"
                  fill="hsl(142, 76%, 36%)"
                  fillOpacity={0.7}
                />
                <Area
                  type="monotone"
                  dataKey="diseased"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.7}
                />
                <Area
                  type="monotone"
                  dataKey="scanning"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-muted-foreground">System Online</span>
          </div>
          <div className="text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}