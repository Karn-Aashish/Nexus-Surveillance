import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LiveMonitor } from "@/components/LiveMonitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Play, Pause, Square, RefreshCw } from "lucide-react";

const MonitorPage = () => {
  const [activeMonitors, setActiveMonitors] = useState([
    { id: "1", name: "Target Alpha", status: "active", location: "New York, US" },
    { id: "2", name: "Workstation Beta", status: "paused", location: "London, UK" },
    { id: "3", name: "Mobile Gamma", status: "active", location: "Tokyo, JP" },
  ]);

  const [selectedTarget, setSelectedTarget] = useState(activeMonitors[0]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen matrix-grid p-6"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold nexus-header">LIVE MONITOR</h1>
          <p className="text-muted-foreground">Real-time surveillance and monitoring</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="glass-panel hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Active Monitors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeMonitors.map((monitor) => (
                <div 
                  key={monitor.id}
                  onClick={() => setSelectedTarget(monitor)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent/50 ${
                    selectedTarget.id === monitor.id ? 'border-primary bg-accent/30' : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{monitor.name}</p>
                      <p className="text-sm text-muted-foreground">{monitor.location}</p>
                    </div>
                    <Badge variant={monitor.status === "active" ? "default" : "secondary"}>
                      {monitor.status}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="pt-3 border-t space-y-2">
                <Button size="sm" className="w-full btn-3d">
                  <Play className="w-4 h-4 mr-2" />
                  Start All
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <LiveMonitor 
              targetId={selectedTarget.id} 
              targetName={selectedTarget.name}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MonitorPage;