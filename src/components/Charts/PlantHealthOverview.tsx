import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { category: "Vegetables", healthy: 245, diseased: 32, total: 277 },
  { category: "Fruits", healthy: 189, diseased: 28, total: 217 },
  { category: "Flowers", healthy: 156, diseased: 19, total: 175 },
  { category: "Herbs", healthy: 134, diseased: 12, total: 146 },
  { category: "Trees", healthy: 98, diseased: 15, total: 113 },
];

const chartConfig = {
  healthy: {
    label: "Healthy Plants",
    color: "hsl(var(--primary))",
  },
  diseased: {
    label: "Diseased Plants",
    color: "hsl(var(--destructive))",
  },
};

export default function PlantHealthOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant Health by Category</CardTitle>
        <CardDescription>Health status distribution across plant types</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="healthy"
                fill="hsl(var(--primary))"
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
      </CardContent>
    </Card>
  );
}