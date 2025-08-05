import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusCard } from "@/components/StatusCard";
import { ThreatAlert } from "@/components/ThreatAlert";
import { DeviceCard } from "@/components/DeviceCard";
import { ActivityLog } from "@/components/ActivityLog";
import { HolographicGlobe } from "@/components/HolographicGlobe";
import { LiveMonitor } from "@/components/LiveMonitor";
import { NetworkScanner } from "@/components/NetworkScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Activity,
  Users,
  AlertTriangle,
  Eye,
  Laptop,
  Database,
  Network,
  Target,
  TrendingUp,
  Clock,
  Globe,
  Zap,
  Play,
  Download,
  Settings,
  Camera,
  Wifi,
  Lock,
  Unlock,
} from "lucide-react";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      title: "Unauthorized Access Detected",
      description: "Multiple failed login attempts from suspicious IP address 192.168.1.254",
      severity: "critical" as const,
      timestamp: "2 minutes ago",
      source: "Authentication System",
      location: "Moscow, RU"
    },
    {
      id: "2", 
      title: "Data Exfiltration Alert",
      description: "Large file transfer detected from target device TD-001",
      severity: "high" as const,
      timestamp: "15 minutes ago",
      source: "Network Monitor",
      location: "Berlin, DE"
    },
    {
      id: "3",
      title: "Surveillance Module Active",
      description: "Camera and microphone access enabled on target device",
      severity: "medium" as const,
      timestamp: "1 hour ago",
      source: "Device Controller",
      location: "London, UK"
    }
  ]);

  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "Target Alpha",
      type: "mobile" as const,
      status: "online" as const,
      lastSeen: "2 minutes ago",
      location: "New York, US",
      batteryLevel: 78,
      ipAddress: "192.168.1.105",
      osInfo: "Android 14"
    },
    {
      id: "2",
      name: "Workstation Beta",
      type: "laptop" as const,
      status: "online" as const,
      lastSeen: "5 minutes ago", 
      location: "London, UK",
      ipAddress: "10.0.0.45",
      osInfo: "Windows 11"
    },
    {
      id: "3",
      name: "Tablet Gamma",
      type: "tablet" as const,
      status: "offline" as const,
      lastSeen: "2 hours ago",
      location: "Tokyo, JP",
      batteryLevel: 23,
      ipAddress: "172.16.0.12",
      osInfo: "iOS 17"
    }
  ]);

  const [activeOperations, setActiveOperations] = useState(0);
  const [isGlobalScanActive, setIsGlobalScanActive] = useState(false);
  const { toast } = useToast();

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOperations(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Dismissed",
      description: "Alert has been marked as resolved.",
    });
  };

  const handleStartMonitoring = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    toast({
      title: "Surveillance Initiated",
      description: `Live monitoring started for ${device?.name}`,
    });
  };

  const handleDataExtraction = () => {
    toast({
      title: "Data Extraction Started",
      description: "Beginning comprehensive data collection from all active targets.",
    });
  };

  const handleNetworkScan = () => {
    setIsGlobalScanActive(true);
    toast({
      title: "Network Scan Initiated",
      description: "Scanning for vulnerable targets in the network.",
    });
    
    setTimeout(() => {
      setIsGlobalScanActive(false);
      toast({
        title: "Scan Complete",
        description: "3 new vulnerable targets discovered.",
      });
    }, 5000);
  };

  const handleDeployAgent = () => {
    toast({
      title: "Agent Deployed",
      description: "Surveillance agent successfully deployed to target system.",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen matrix-grid"
    >
      <div className="p-6 space-y-6">
        {/* Enhanced Header with Glitch Effect */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold nexus-header">
              NEXUS SURVEILLANCE
            </h1>
            <p className="text-muted-foreground font-space">Real-time global intelligence operations</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 glass-panel border border-green-500/30"
            >
              <div className="status-indicator bg-green-500" />
              <span className="text-sm text-green-400 font-cyber">NEXUS ONLINE</span>
            </motion.div>
            <div className="text-sm text-muted-foreground font-cyber">
              OPS: {activeOperations}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Status Cards with 3D Effects */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatusCard
            title="Active Targets"
            value="47"
            description="Devices under surveillance"
            icon={<Target className="w-4 h-4" />}
            trend={{ value: 12, isPositive: true }}
            className="hover-glow btn-3d"
          />
          <StatusCard
            title="Data Collected"
            value="2.4 TB"
            description="Total intelligence gathered"
            icon={<Database className="w-4 h-4" />}
            trend={{ value: 8, isPositive: true }}
            className="hover-glow btn-3d"
          />
          <StatusCard
            title="Active Alerts"
            value={alerts.length}
            description="Requiring immediate attention"
            icon={<AlertTriangle className="w-4 h-4" />}
            variant="critical"
            className="hover-glow btn-3d"
          />
          <StatusCard
            title="Operations"
            value={activeOperations}
            description="Active surveillance ops"
            icon={<Activity className="w-4 h-4" />}
            className="hover-glow btn-3d"
          />
        </motion.div>

        {/* Interactive Tabs with Advanced Components */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="glass-panel border border-primary/30">
            <TabsTrigger value="overview" className="btn-3d">Overview</TabsTrigger>
            <TabsTrigger value="globe" className="btn-3d">Global View</TabsTrigger>
            <TabsTrigger value="live" className="btn-3d">Live Monitor</TabsTrigger>
            <TabsTrigger value="network" className="btn-3d">Network Scan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="glass-panel hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 hologram-text">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Critical Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <AnimatePresence>
                      {alerts.map((alert, index) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ThreatAlert {...alert} onDismiss={handleDismissAlert} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                <Card className="glass-panel hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 hologram-text">
                      <Laptop className="w-5 h-5 text-primary" />
                      Monitored Devices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {devices.map((device) => (
                        <DeviceCard 
                          key={device.id} 
                          {...device} 
                          onMonitor={handleStartMonitoring}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <ActivityLog entries={[]} />
                
                <Card className="glass-panel hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 hologram-text">
                      <Zap className="w-5 h-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full justify-start btn-3d hover-glow" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Start Live Monitor
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl glass-panel">
                        <DialogHeader>
                          <DialogTitle>Live Surveillance Monitor</DialogTitle>
                        </DialogHeader>
                        <LiveMonitor targetId="1" targetName="Target Alpha" />
                      </DialogContent>
                    </Dialog>

                    <Button 
                      onClick={handleDataExtraction}
                      className="w-full justify-start btn-3d hover-glow" 
                      size="sm"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Extract Data
                    </Button>
                    
                    <Button 
                      onClick={handleNetworkScan}
                      disabled={isGlobalScanActive}
                      className="w-full justify-start btn-3d hover-glow" 
                      size="sm"
                    >
                      <Network className="w-4 h-4 mr-2" />
                      {isGlobalScanActive ? "Scanning..." : "Scan Network"}
                    </Button>
                    
                    <Button 
                      onClick={handleDeployAgent}
                      className="w-full justify-start btn-3d hover-glow" 
                      size="sm"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Deploy Agent
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="globe">
            <HolographicGlobe />
          </TabsContent>

          <TabsContent value="live">
            <LiveMonitor targetId="1" targetName="Target Alpha" />
          </TabsContent>

          <TabsContent value="network">
            <NetworkScanner />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Dashboard;