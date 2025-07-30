import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DiseaseResultProps {
  result?: {
    disease: string;
    confidence: number;
    severity: "low" | "medium" | "high";
    recommendations: string[];
  };
}

const DiseaseResult = ({ result }: DiseaseResultProps) => {
  if (!result) {
    return (
      <Card className="w-full">
        <CardContent className="p-12 text-center">
          <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Upload an image to see disease detection results
          </p>
        </CardContent>
      </Card>
    );
  }

  const severityColors = {
    low: "success",
    medium: "warning",
    high: "destructive"
  } as const;

  const severityIcons = {
    low: CheckCircle,
    medium: AlertTriangle,
    high: AlertTriangle
  };

  const SeverityIcon = severityIcons[result.severity];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SeverityIcon className="h-5 w-5" />
          Detection Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{result.disease}</h3>
            <p className="text-sm text-muted-foreground">
              Confidence: {result.confidence}%
            </p>
          </div>
          <Badge variant={severityColors[result.severity]} className="capitalize">
            {result.severity} Risk
          </Badge>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Recommended Actions:</h4>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Save Report
          </Button>
          <Button variant="ghost" size="sm">
            Get More Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseResult;