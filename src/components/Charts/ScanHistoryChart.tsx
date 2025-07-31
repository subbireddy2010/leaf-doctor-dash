import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", scans: 65, diseases: 12 },
  { month: "Feb", scans: 89, diseases: 18 },
  { month: "Mar", scans: 123, diseases: 25 },
  { month: "Apr", scans: 156, diseases: 31 },
  { month: "May", scans: 198, diseases: 28 },
  { month: "Jun", scans: 234, diseases: 42 },
];

const chartConfig = {
  scans: {
    label: "Total Scans",
    color: "hsl(var(--primary))",
  },
  diseases: {
    label: "Diseases Found",
    color: "hsl(var(--destructive))",
  },
};

export default function ScanHistoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
        <CardDescription>Monthly scan activity and disease detection trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="scans"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="diseases"
                stackId="2"
                stroke="hsl(var(--destructive))"
                fill="hsl(var(--destructive))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}