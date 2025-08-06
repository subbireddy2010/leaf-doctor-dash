
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const analysisData = [
  { id: 1, plant: "Tomato", disease: "Leaf Spot", confidence: 94, severity: "medium", date: "2024-01-15" },
  { id: 2, plant: "Rose", disease: "Powdery Mildew", confidence: 89, severity: "high", date: "2024-01-15" },
  { id: 3, plant: "Lettuce", disease: "Healthy", confidence: 98, severity: "low", date: "2024-01-14" },
  { id: 4, plant: "Cucumber", disease: "Bacterial Blight", confidence: 92, severity: "high", date: "2024-01-14" },
];

const DetailedAnalysisTable = () => {
  const severityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plant Type</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysisData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.plant}</TableCell>
                <TableCell>{item.disease}</TableCell>
                <TableCell>{item.confidence}%</TableCell>
                <TableCell>
                  <Badge className={severityColors[item.severity as keyof typeof severityColors]}>
                    {item.severity.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DetailedAnalysisTable;
