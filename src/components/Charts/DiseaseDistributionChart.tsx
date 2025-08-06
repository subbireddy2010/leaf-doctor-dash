
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Healthy', value: 70, color: '#10B981' },
  { name: 'Leaf Spot', value: 15, color: '#F59E0B' },
  { name: 'Powdery Mildew', value: 10, color: '#EF4444' },
  { name: 'Bacterial Blight', value: 5, color: '#8B5CF6' },
];

const DiseaseDistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DiseaseDistributionChart;
