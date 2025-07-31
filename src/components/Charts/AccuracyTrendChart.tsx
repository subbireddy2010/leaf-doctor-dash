import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { week: "Week 1", accuracy: 89.2, samples: 45 },
  { week: "Week 2", accuracy: 91.5, samples: 67 },
  { week: "Week 3", accuracy: 93.1, samples: 89 },
  { week: "Week 4", accuracy: 94.2, samples: 92 },
  { week: "Week 5", accuracy: 93.8, samples: 78 },
  { week: "Week 6", accuracy: 95.1, samples: 103 },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy (%)",
    color: "hsl(var(--primary))",
  },
};

export default function AccuracyTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Accuracy Trend</CardTitle>
        <CardDescription>AI model accuracy over the past 6 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="week" />
              <YAxis domain={[85, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}