import { AlertTriangle, X, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ThreatAlertProps {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
  source: string;
  location?: string;
  onDismiss?: (id: string) => void;
  onView?: (id: string) => void;
}

const severityConfig = {
  critical: {
    className: "threat-critical",
    bgClass: "bg-red-500/10",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
  high: {
    className: "threat-high", 
    bgClass: "bg-orange-500/10",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/30",
  },
  medium: {
    className: "threat-medium",
    bgClass: "bg-yellow-500/10", 
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
  },
  low: {
    className: "threat-low",
    bgClass: "bg-green-500/10",
    textClass: "text-green-400", 
    borderClass: "border-green-500/30",
  },
};

export function ThreatAlert({
  id,
  title,
  description,
  severity,
  timestamp,
  source,
  location,
  onDismiss,
  onView,
}: ThreatAlertProps) {
  const config = severityConfig[severity];

  return (
    <Card className={cn(
      "glass-panel border transition-all duration-200",
      config.borderClass,
      config.bgClass
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className={cn("w-4 h-4", config.textClass)} />
            <Badge variant="secondary" className={cn("text-xs", config.textClass)}>
              {severity.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(id)}
                className="h-6 w-6 p-0 hover:bg-primary/20"
              >
                <Eye className="w-3 h-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView?.(id)}
              className="h-6 w-6 p-0 hover:bg-primary/20"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(id)}
                className="h-6 w-6 p-0 hover:bg-destructive/20"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Source: {source}</span>
            {location && <span>Location: {location}</span>}
          </div>
          <span>{timestamp}</span>
        </div>
      </CardContent>
    </Card>
  );
}