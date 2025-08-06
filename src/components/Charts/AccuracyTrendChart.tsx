
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', accuracy: 92 },
  { name: 'Week 2', accuracy: 94 },
  { name: 'Week 3', accuracy: 95 },
  { name: 'Week 4', accuracy: 96 },
];

const AccuracyTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accuracy Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[90, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AccuracyTrendChart;
