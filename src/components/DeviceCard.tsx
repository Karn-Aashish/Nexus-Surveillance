import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Wifi, 
  WifiOff,
  Battery,
  MapPin,
  Eye,
  Settings,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DeviceCardProps {
  id: string;
  name: string;
  type: "laptop" | "mobile" | "tablet" | "desktop";
  status: "online" | "offline" | "inactive";
  lastSeen: string;
  location: string;
  batteryLevel?: number;
  ipAddress: string;
  osInfo: string;
  onMonitor?: (id: string) => void;
  onConfigure?: (id: string) => void;
}

const deviceIcons = {
  laptop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
};

const statusConfig = {
  online: {
    color: "text-green-400",
    bg: "bg-green-500/20",
    indicator: "bg-green-500",
  },
  offline: {
    color: "text-red-400", 
    bg: "bg-red-500/20",
    indicator: "bg-red-500",
  },
  inactive: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/20", 
    indicator: "bg-yellow-500",
  },
};

export function DeviceCard({
  id,
  name,
  type,
  status,
  lastSeen,
  location,
  batteryLevel,
  ipAddress,
  osInfo,
  onMonitor,
  onConfigure,
}: DeviceCardProps) {
  const DeviceIcon = deviceIcons[type];
  const config = statusConfig[status];

  return (
    <Card className="glass-panel hover:shadow-elevated transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <DeviceIcon className="w-8 h-8 text-primary" />
              <div className={cn(
                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card",
                config.indicator
              )} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs", config.color, config.bg)}
                >
                  {status.toUpperCase()}
                </Badge>
                {status === "online" ? (
                  <Wifi className="w-3 h-3 text-green-400" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-400" />
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover border border-border/50">
              <DropdownMenuItem onClick={() => onMonitor?.(id)}>
                <Eye className="w-4 h-4 mr-2" />
                Start Monitoring
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onConfigure?.(id)}>
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">IP Address</span>
            <p className="text-foreground font-mono">{ipAddress}</p>
          </div>
          <div>
            <span className="text-muted-foreground">OS</span>
            <p className="text-foreground">{osInfo}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          {batteryLevel && (
            <div className="flex items-center gap-2">
              <Battery className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{batteryLevel}%</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last seen: {lastSeen}
        </div>
      </CardContent>
    </Card>
  );
}