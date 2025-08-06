
import { useState } from "react";
import { Scan, TrendingUp, Activity, AlertTriangle, Shield, Target, Brain } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Mock data for demo
  const mockResult = {
    disease: "Leaf Spot Disease",
    confidence: 87,
    severity: "medium" as const,
    recommendations: [
      "Remove affected leaves immediately",
      "Apply fungicide spray every 7-10 days",
      "Improve air circulation around the plant",
      "Avoid overhead watering",
      "Monitor plant daily for new symptoms"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-r from-primary to-green-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Plant Health Detection</h2>
            <p className="text-lg opacity-80">AI-powered disease identification for healthier plants</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Stats Overview */}
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <StatsCard
              icon={Scan}
              title="Total Scans"
              value="12,847"
              trend="+12% this month"
              trendColor="success"
              href="/analytics/scans"
            />
            <StatsCard
              icon={Brain}
              title="AI Accuracy"
              value="95.8%"
              trend="+2.1% this week"
              trendColor="success"
              href="/analytics/accuracy"
            />
            <StatsCard
              icon={Activity}
              title="Healthy Plants"
              value="11,892"
              trend="+5% this month"
              trendColor="success"
              href="/plants/healthy"
            />
            <StatsCard
              icon={AlertTriangle}
              title="Active Issues"
              value="35"
              trend="-8% this month"
              trendColor="success"
              href="/alerts/active"
            />
            <StatsCard
              icon={Target}
              title="Detection Rate"
              value="97.1%"
              trend="+1.5% this week"
              trendColor="success"
              href="/analytics/detection"
            />
            <StatsCard
              icon={Shield}
              title="Prevented Loss"
              value="$127K"
              trend="+23% this month"
              trendColor="success"
              href="/analytics/savings"
            />
            <StatsCard
              icon={TrendingUp}
              title="System Health"
              value="99.9%"
              trend="Stable"
              trendColor="success"
              href="/system/health"
            />
          </div>
        </div>

        {/* Simple placeholder cards for now */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Image Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upload plant images for analysis</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View your recent plant scans</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {mockResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{mockResult.disease}</h3>
                  <p className="text-muted-foreground">Confidence: {mockResult.confidence}%</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {mockResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
