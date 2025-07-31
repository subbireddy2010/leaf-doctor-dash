import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import healthyTomato from "@/assets/healthy-tomato-plant.jpg";
import diseasedLeaf from "@/assets/diseased-leaf-spots.jpg";
import powderyMildew from "@/assets/powdery-mildew-rose.jpg";
import healthyLettuce from "@/assets/healthy-lettuce.jpg";
import healthyCucumber from "@/assets/healthy-cucumber.jpg";
import bacterialBlight from "@/assets/bacterial-blight.jpg";

const mockScans = [
  {
    id: 1,
    image: healthyTomato,
    disease: "Healthy Plant",
    confidence: 98,
    severity: "low" as const,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    image: diseasedLeaf, 
    disease: "Leaf Spot",
    confidence: 85,
    severity: "medium" as const,
    timestamp: "1 day ago"
  },
  {
    id: 3,
    image: powderyMildew,
    disease: "Powdery Mildew",
    confidence: 92,
    severity: "high" as const,
    timestamp: "2 days ago"
  },
  {
    id: 4,
    image: healthyLettuce,
    disease: "Healthy Plant",
    confidence: 96,
    severity: "low" as const,
    timestamp: "3 days ago"
  },
  {
    id: 5,
    image: bacterialBlight,
    disease: "Bacterial Blight",
    confidence: 89,
    severity: "high" as const,
    timestamp: "4 days ago"
  }
];

const RecentScans = () => {
  const severityColors = {
    low: "success",
    medium: "warning", 
    high: "destructive"
  } as const;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Scans
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockScans.map((scan) => (
          <div key={scan.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src={scan.image} 
                alt={scan.disease}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{scan.disease}</p>
              <p className="text-sm text-muted-foreground">{scan.timestamp}</p>
            </div>
            <div className="text-right">
              <Badge variant={severityColors[scan.severity]} className="mb-1">
                {scan.confidence}%
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentScans;