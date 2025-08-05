import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Eye, 
  Download,
  Upload,
  Lock,
  Unlock,
  User,
  FileText,
  Camera,
  MapPin
} from "lucide-react";

interface ActivityLogEntry {
  id: string;
  timestamp: string;
  type: "security" | "access" | "data" | "alert" | "user" | "system";
  action: string;
  description: string;
  source: string;
  severity?: "low" | "medium" | "high" | "critical";
  location?: string;
}

interface ActivityLogProps {
  entries: ActivityLogEntry[];
  className?: string;
}

const typeConfig = {
  security: { icon: Shield, color: "text-blue-400" },
  access: { icon: Eye, color: "text-green-400" },
  data: { icon: Download, color: "text-purple-400" },
  alert: { icon: AlertTriangle, color: "text-red-400" },
  user: { icon: User, color: "text-yellow-400" },
  system: { icon: Activity, color: "text-gray-400" },
};

const severityConfig = {
  low: "text-green-400",
  medium: "text-yellow-400", 
  high: "text-orange-400",
  critical: "text-red-400",
};

const mockEntries: ActivityLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-20 14:32:15",
    type: "security",
    action: "Authentication",
    description: "Successful login from new device",
    source: "192.168.1.105",
    severity: "medium",
    location: "New York, US"
  },
  {
    id: "2", 
    timestamp: "2024-01-20 14:31:08",
    type: "data",
    action: "Data Extraction",
    description: "Contact list exported successfully",
    source: "target-device-01",
    severity: "low"
  },
  {
    id: "3",
    timestamp: "2024-01-20 14:29:45",
    type: "alert",
    action: "Threat Detected",
    description: "Suspicious network activity detected",
    source: "network-scanner",
    severity: "high",
    location: "Los Angeles, US"
  },
  {
    id: "4",
    timestamp: "2024-01-20 14:28:22", 
    type: "access",
    action: "Camera Access",
    description: "Front camera activated remotely",
    source: "target-device-02",
    severity: "medium"
  },
  {
    id: "5",
    timestamp: "2024-01-20 14:27:01",
    type: "user",
    action: "User Activity",
    description: "Agent Johnson accessed classified files",
    source: "internal-system",
    severity: "low"
  }
];

export function ActivityLog({ entries = mockEntries, className }: ActivityLogProps) {
  return (
    <Card className={cn("glass-panel", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {entries.map((entry) => {
              const config = typeConfig[entry.type];
              const Icon = config.icon;
              
              return (
                <div 
                  key={entry.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/30 hover:bg-secondary/20 transition-colors"
                >
                  <div className={cn("mt-1", config.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {entry.action}
                      </span>
                      {entry.severity && (
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", severityConfig[entry.severity])}
                        >
                          {entry.severity}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {entry.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Source: {entry.source}</span>
                      {entry.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {entry.location}
                        </span>
                      )}
                      <span className="ml-auto font-mono">{entry.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}