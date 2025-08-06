
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', scans: 400 },
  { name: 'Feb', scans: 300 },
  { name: 'Mar', scans: 500 },
  { name: 'Apr', scans: 280 },
  { name: 'May', scans: 590 },
  { name: 'Jun', scans: 320 },
];

const ScanHistoryChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="scans" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScanHistoryChart;
