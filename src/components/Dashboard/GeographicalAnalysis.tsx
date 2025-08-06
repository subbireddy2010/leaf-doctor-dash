
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const locations = [
  { region: "North Region", scans: 1240, diseases: 85, rate: "6.8%" },
  { region: "South Region", scans: 980, diseases: 120, rate: "12.2%" },
  { region: "East Region", scans: 1560, diseases: 78, rate: "5.0%" },
  { region: "West Region", scans: 720, diseases: 95, rate: "13.2%" },
];

const GeographicalAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Geographical Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{location.region}</p>
                <p className="text-sm text-muted-foreground">{location.scans} scans</p>
              </div>
              <div className="text-right">
                <Badge variant={parseFloat(location.rate) > 10 ? "destructive" : "secondary"}>
                  {location.rate}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{location.diseases} diseases</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicalAnalysis;
