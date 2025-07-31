import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, Leaf } from "lucide-react";
import healthyTomato from "@/assets/healthy-tomato-plant.jpg";
import diseasedLeaf from "@/assets/diseased-leaf-spots.jpg";
import powderyMildew from "@/assets/powdery-mildew-rose.jpg";
import bacterialBlight from "@/assets/bacterial-blight.jpg";

interface ScanRecord {
  id: string;
  image: string;
  plantType: string;
  diagnosis: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  location: string;
  timestamp: string;
  technician: string;
}

const mockRecords: ScanRecord[] = [
  {
    id: "SC-2024-001",
    image: diseasedLeaf,
    plantType: "Tomato",
    diagnosis: "Bacterial Spot",
    confidence: 94,
    severity: "high",
    location: "Greenhouse A-12",
    timestamp: "2024-01-15 14:30",
    technician: "Dr. Smith"
  },
  {
    id: "SC-2024-002", 
    image: healthyTomato,
    plantType: "Tomato",
    diagnosis: "Healthy",
    confidence: 98,
    severity: "low",
    location: "Field B-08",
    timestamp: "2024-01-15 13:45",
    technician: "J. Wilson"
  },
  {
    id: "SC-2024-003",
    image: powderyMildew,
    plantType: "Rose",
    diagnosis: "Powdery Mildew",
    confidence: 91,
    severity: "medium",
    location: "Garden C-05",
    timestamp: "2024-01-15 12:20",
    technician: "M. Garcia"
  },
  {
    id: "SC-2024-004",
    image: bacterialBlight,
    plantType: "Pepper",
    diagnosis: "Bacterial Blight",
    confidence: 87,
    severity: "high",
    location: "Greenhouse B-03",
    timestamp: "2024-01-15 11:15",
    technician: "Dr. Smith"
  }
];

export default function DetailedAnalysisTable() {
  const [records, setRecords] = useState<ScanRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [plantTypeFilter, setPlantTypeFilter] = useState<string>("all");

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.plantType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || record.severity === severityFilter;
    const matchesPlantType = plantTypeFilter === "all" || record.plantType === plantTypeFilter;
    
    return matchesSearch && matchesSeverity && matchesPlantType;
  });

  const getSeverityColor = (severity: ScanRecord["severity"]) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  const getUniqueValues = (key: keyof ScanRecord) => {
    return [...new Set(records.map(record => String(record[key])))];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Detailed Analysis Records
        </CardTitle>
        <CardDescription>
          Comprehensive database of all plant health assessments
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by diagnosis, plant type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={plantTypeFilter} onValueChange={setPlantTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Plant Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plants</SelectItem>
                {getUniqueValues("plantType").map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <span>Showing {filteredRecords.length} of {records.length} records</span>
          <span>Updated {new Date().toLocaleDateString()}</span>
        </div>

        {/* Records Table */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-lg border border-border/50 hover:bg-accent/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={record.image}
                    alt={record.diagnosis}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-foreground">{record.diagnosis}</h4>
                      <Badge 
                        variant={record.diagnosis === "Healthy" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {record.plantType}
                      </Badge>
                      <Badge variant={getSeverityColor(record.severity)} className="text-xs">
                        {record.severity} risk
                      </Badge>
                    </div>
                    
                    <div className="text-sm font-mono text-muted-foreground">
                      {record.id}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Confidence</div>
                      <div className="font-medium">{record.confidence}%</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground">Location</div>
                      <div className="font-medium">{record.location}</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground">Timestamp</div>
                      <div className="font-medium">{record.timestamp}</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground">Technician</div>
                      <div className="font-medium">{record.technician}</div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No records found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}