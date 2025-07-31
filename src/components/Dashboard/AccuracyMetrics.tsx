import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Dot } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp } from "lucide-react";

const accuracyData = [
  { week: "Week 1", detection: 89.2, identification: 85.1, overall: 87.1 },
  { week: "Week 2", detection: 91.5, identification: 87.3, overall: 89.4 },
  { week: "Week 3", detection: 93.1, identification: 89.8, overall: 91.4 },
  { week: "Week 4", detection: 94.2, identification: 91.2, overall: 92.7 },
  { week: "Week 5", detection: 93.8, identification: 90.9, overall: 92.3 },
  { week: "Week 6", detection: 95.1, identification: 92.4, overall: 93.7 },
  { week: "Week 7", detection: 96.3, identification: 93.8, overall: 95.0 },
  { week: "Week 8", detection: 97.1, identification: 94.5, overall: 95.8 },
];

const chartConfig = {
  detection: {
    label: "Disease Detection",
    color: "hsl(var(--primary))",
  },
  identification: {
    label: "Disease Identification", 
    color: "hsl(142, 76%, 36%)",
  },
  overall: {
    label: "Overall Accuracy",
    color: "hsl(var(--secondary))",
  },
};

export default function AccuracyMetrics() {
  const currentAccuracy = accuracyData[accuracyData.length - 1];
  const previousAccuracy = accuracyData[accuracyData.length - 2];
  
  const calculateTrend = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`,
      positive: change >= 0
    };
  };

  const detectionTrend = calculateTrend(currentAccuracy.detection, previousAccuracy.detection);
  const identificationTrend = calculateTrend(currentAccuracy.identification, previousAccuracy.identification);
  const overallTrend = calculateTrend(currentAccuracy.overall, previousAccuracy.overall);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          AI Model Accuracy
        </CardTitle>
        <CardDescription>
          Performance metrics and accuracy trends over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-primary/5">
            <div className="text-2xl font-bold text-primary font-mono">
              {currentAccuracy.detection.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mb-1">Detection Rate</div>
            <Badge 
              variant={detectionTrend.positive ? "default" : "destructive"} 
              className="text-xs"
            >
              {detectionTrend.value}
            </Badge>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold text-green-600 font-mono">
              {currentAccuracy.identification.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mb-1">Identification</div>
            <Badge 
              variant={identificationTrend.positive ? "default" : "destructive"} 
              className="text-xs"
            >
              {identificationTrend.value}
            </Badge>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-secondary/20">
            <div className="text-2xl font-bold text-secondary-foreground font-mono">
              {currentAccuracy.overall.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground mb-1">Overall Score</div>
            <Badge 
              variant={overallTrend.positive ? "default" : "destructive"} 
              className="text-xs"
            >
              {overallTrend.value}
            </Badge>
          </div>
        </div>

        {/* Accuracy Trend Chart */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">8-Week Performance Trend</h4>
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Improving
            </Badge>
          </div>
          
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" fontSize={12} />
                <YAxis domain={[80, 100]} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="detection"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="identification"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(142, 76%, 36%)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="overall"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--secondary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Model Information */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1">
              <div className="font-medium">Model Version: v2.1.3</div>
              <div className="text-muted-foreground">Last trained: 2 days ago</div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-medium">Training Samples: 125,000</div>
              <div className="text-muted-foreground">Validation Set: 15,000</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}