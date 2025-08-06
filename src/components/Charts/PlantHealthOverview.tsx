
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Tomatoes', healthy: 80, diseased: 20 },
  { name: 'Peppers', healthy: 85, diseased: 15 },
  { name: 'Lettuce', healthy: 90, diseased: 10 },
  { name: 'Cucumbers', healthy: 75, diseased: 25 },
];

const PlantHealthOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plant Health Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="healthy" fill="#10B981" />
            <Bar dataKey="diseased" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PlantHealthOverview;
