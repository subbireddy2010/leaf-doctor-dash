
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface SecurityEvent {
  id: string;
  type: 'upload_attempt' | 'validation_error' | 'rate_limit' | 'system_check';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
}

const SecurityMonitor = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [systemStatus, setSystemStatus] = useState<'secure' | 'warning' | 'alert'>('secure');

  useEffect(() => {
    // Mock security events for demonstration
    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'system_check',
        message: 'Security scan completed - All systems secure',
        severity: 'low',
        timestamp: new Date(Date.now() - 5 * 60000)
      },
      {
        id: '2',
        type: 'upload_attempt',
        message: 'File validation passed for plant image upload',
        severity: 'low',
        timestamp: new Date(Date.now() - 10 * 60000)
      },
      {
        id: '3',
        type: 'validation_error',
        message: 'Invalid file type blocked - security protocols active',
        severity: 'medium',
        timestamp: new Date(Date.now() - 15 * 60000)
      }
    ];

    setEvents(mockEvents);
    
    // Determine system status based on recent events
    const recentHighSeverity = mockEvents.some(
      event => event.severity === 'high' && 
      Date.now() - event.timestamp.getTime() < 3600000 // Last hour
    );
    
    const recentMediumSeverity = mockEvents.some(
      event => event.severity === 'medium' && 
      Date.now() - event.timestamp.getTime() < 1800000 // Last 30 minutes
    );

    if (recentHighSeverity) {
      setSystemStatus('alert');
    } else if (recentMediumSeverity) {
      setSystemStatus('warning');
    } else {
      setSystemStatus('secure');
    }
  }, []);

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'secure':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Monitor
          </span>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <Badge variant={systemStatus === 'secure' ? 'secondary' : 'destructive'}>
              {systemStatus.toUpperCase()}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{event.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge className={getStatusColor(event.severity)}>
                    {event.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(event.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Security Level:</span>
            <span className="font-medium">Enhanced</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Last Scan:</span>
            <span>5 minutes ago</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Threats Blocked:</span>
            <span className="font-medium text-green-600">3 today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMonitor;
