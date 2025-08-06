
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

const AccuracyMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Accuracy Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Accuracy</span>
              <span>95.8%</span>
            </div>
            <Progress value={95.8} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Disease Detection</span>
              <span>97.1%</span>
            </div>
            <Progress value={97.1} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>False Positives</span>
              <span>2.3%</span>
            </div>
            <Progress value={2.3} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyMetrics;
