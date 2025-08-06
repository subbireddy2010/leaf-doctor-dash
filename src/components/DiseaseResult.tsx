
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface DiseaseResultProps {
  result: {
    disease: string;
    confidence: number;
    severity: "low" | "medium" | "high";
    recommendations: string[];
  } | null;
}

const DiseaseResult = ({ result }: DiseaseResultProps) => {
  if (!result) return null;

  const severityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800", 
    high: "bg-red-100 text-red-800"
  };

  const SeverityIcon = {
    low: CheckCircle,
    medium: AlertTriangle,
    high: XCircle
  };

  const IconComponent = SeverityIcon[result.severity];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{result.disease}</h3>
            <Badge className={severityColors[result.severity]}>
              <IconComponent className="mr-1 h-3 w-3" />
              {result.severity.toUpperCase()}
            </Badge>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Confidence: {result.confidence}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-muted-foreground">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseResult;
