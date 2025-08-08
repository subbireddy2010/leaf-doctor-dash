
import { useState } from "react";
import { Scan, TrendingUp, Activity, AlertTriangle, Shield, Target, Brain } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import DiseaseResult from "@/components/DiseaseResult";
import RecentScans from "@/components/RecentScans";
import ScanHistoryChart from "@/components/Charts/ScanHistoryChart";
import PlantHealthOverview from "@/components/Charts/PlantHealthOverview";
import DiseaseDistributionChart from "@/components/Charts/DiseaseDistributionChart";
import AccuracyTrendChart from "@/components/Charts/AccuracyTrendChart";
import AlertSystem from "@/components/Dashboard/AlertSystem";
import RealTimeMonitoring from "@/components/Dashboard/RealTimeMonitoring";
import AccuracyMetrics from "@/components/Dashboard/AccuracyMetrics";
import GeographicalAnalysis from "@/components/Dashboard/GeographicalAnalysis";
import DetailedAnalysisTable from "@/components/Dashboard/DetailedAnalysisTable";

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
    <div className="min-h-screen" style={{ background: 'var(--gradient-dashboard)' }}>
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-48" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-foreground">
            <h2 className="text-3xl font-bold mb-2">Plant Health Detection</h2>
            <p className="text-lg opacity-80">AI-powered disease identification for healthier plants</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Stats Overview */}
        <div className="rounded-xl p-6 mb-8" style={{ background: 'var(--gradient-stats)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <StatsCard
              icon={Scan}
              title="Total Scans"
              value="12,847"
              trend="+12% this month"
              trendColor="success"
            />
            <StatsCard
              icon={Brain}
              title="AI Accuracy"
              value="95.8%"
              trend="+2.1% this week"
              trendColor="success"
            />
            <StatsCard
              icon={Activity}
              title="Healthy Plants"
              value="11,892"
              trend="+5% this month"
              trendColor="success"
            />
            <StatsCard
              icon={AlertTriangle}
              title="Active Issues"
              value="35"
              trend="-8% this month"
              trendColor="success"
            />
            <StatsCard
              icon={Target}
              title="Detection Rate"
              value="97.1%"
              trend="+1.5% this week"
              trendColor="success"
            />
            <StatsCard
              icon={Shield}
              title="Prevented Loss"
              value="$127K"
              trend="+23% this month"
              trendColor="success"
            />
            <StatsCard
              icon={TrendingUp}
              title="System Health"
              value="99.9%"
              trend="Stable"
              trendColor="success"
            />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageUpload />
            <ScanHistoryChart />
            <PlantHealthOverview />
          </div>
          
          <div className="space-y-6">
            <RecentScans />
            <AlertSystem />
            <RealTimeMonitoring />
          </div>
        </div>

        {/* Analysis Results */}
        <DiseaseResult result={mockResult} />

        {/* Additional Charts and Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <DiseaseDistributionChart />
          <AccuracyTrendChart />
          <AccuracyMetrics />
        </div>

        {/* Geographical Analysis and Detailed Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <GeographicalAnalysis />
          <DetailedAnalysisTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
