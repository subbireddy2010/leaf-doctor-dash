import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingDown } from "lucide-react";

const geographicalData = [
  { region: "North", total: 284, healthy: 267, diseased: 17, riskLevel: "low" },
  { region: "South", total: 312, healthy: 285, diseased: 27, riskLevel: "medium" },
  { region: "East", total: 198, healthy: 176, diseased: 22, riskLevel: "medium" },
  { region: "West", total: 156, healthy: 142, diseased: 14, riskLevel: "low" },
  { region: "Central", total: 89, healthy: 78, diseased: 11, riskLevel: "high" },
];

const riskColors = {
  low: "hsl(142, 76%, 36%)",
  medium: "hsl(45, 93%, 47%)", 
  high: "hsl(var(--destructive))"
};

const chartConfig = {
  healthy: {
    label: "Healthy Plants",
    color: "hsl(142, 76%, 36%)",
  },
  diseased: {
    label: "Diseased Plants",
    color: "hsl(var(--destructive))",
  },
};

export default function GeographicalAnalysis() {
  const totalPlants = geographicalData.reduce((sum, region) => sum + region.total, 0);
  const totalDiseased = geographicalData.reduce((sum, region) => sum + region.diseased, 0);
  const infectionRate = ((totalDiseased / totalPlants) * 100).toFixed(1);
  
  const highestRiskRegion = geographicalData.find(r => r.riskLevel === "high");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Geographical Distribution
        </CardTitle>
        <CardDescription>
          Plant health status across different regions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Regional Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <div className="text-xl font-bold text-primary font-mono">
              {geographicalData.length}
            </div>
            <div className="text-xs text-muted-foreground">Active Regions</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-xl font-bold text-destructive font-mono">
              {infectionRate}%
            </div>
            <div className="text-xs text-muted-foreground">Infection Rate</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-yellow-500/10 col-span-2 lg:col-span-1">
            <div className="text-xl font-bold text-yellow-600 font-mono">
              {highestRiskRegion?.region || "None"}
            </div>
            <div className="text-xs text-muted-foreground">Highest Risk</div>
          </div>
        </div>

        {/* Regional Chart */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Plant Health by Region</h4>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={geographicalData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="region" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="healthy"
                  fill="hsl(142, 76%, 36%)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="diseased"
                  fill="hsl(var(--destructive))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Regional Details */}
        <div className="space-y-3">
          <h4 className="font-medium">Regional Risk Assessment</h4>
          {geographicalData.map((region) => {
            const diseasePercent = ((region.diseased / region.total) * 100).toFixed(1);
            
            return (
              <div
                key={region.region}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{region.region} Region</span>
                  </div>
                  <Badge 
                    variant={
                      region.riskLevel === "high" ? "destructive" :
                      region.riskLevel === "medium" ? "secondary" : "default"
                    }
                    className="text-xs"
                  >
                    {region.riskLevel} risk
                  </Badge>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-sm">
                    {region.total} plants
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {diseasePercent}% infected
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Items */}
        {highestRiskRegion && (
          <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-700">Action Required</span>
            </div>
            <p className="text-sm text-yellow-600">
              {highestRiskRegion.region} region shows high disease risk. 
              Consider increasing monitoring frequency and preventive measures.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}