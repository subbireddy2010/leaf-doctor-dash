import { useState } from "react";
import { Scan, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import ImageUpload from "@/components/ImageUpload";
import DiseaseResult from "@/components/DiseaseResult";
import RecentScans from "@/components/RecentScans";
import heroBanner from "@/assets/hero-banner.jpg";

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
      <div 
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Plant Health Detection</h2>
            <p className="text-lg opacity-90">AI-powered disease identification for healthier plants</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Scan}
            title="Total Scans"
            value="1,234"
            trend="+12% this month"
            trendColor="success"
          />
          <StatsCard
            icon={TrendingUp}
            title="Accuracy Rate"
            value="94.2%"
            trend="+2.1% this week"
            trendColor="success"
          />
          <StatsCard
            icon={Activity}
            title="Healthy Plants"
            value="892"
            trend="+5% this month"
            trendColor="success"
          />
          <StatsCard
            icon={AlertTriangle}
            title="Diseases Detected"
            value="342"
            trend="-8% this month"
            trendColor="success"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Upload */}
          <div className="lg:col-span-2">
            <ImageUpload />
          </div>

          {/* Recent Scans */}
          <div>
            <RecentScans />
          </div>
        </div>

        {/* Analysis Results */}
        <div className="mt-8">
          <DiseaseResult result={mockResult} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;