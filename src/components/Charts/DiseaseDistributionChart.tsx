import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Leaf Spot", value: 35, color: "hsl(var(--destructive))" },
  { name: "Powdery Mildew", value: 28, color: "hsl(var(--warning))" },
  { name: "Root Rot", value: 18, color: "hsl(var(--primary))" },
  { name: "Bacterial Blight", value: 12, color: "hsl(var(--secondary))" },
  { name: "Other", value: 7, color: "hsl(var(--muted))" },
];

const chartConfig = {
  diseases: {
    label: "Disease Types",
  },
};

export default function DiseaseDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Distribution</CardTitle>
        <CardDescription>Most common plant diseases detected</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}