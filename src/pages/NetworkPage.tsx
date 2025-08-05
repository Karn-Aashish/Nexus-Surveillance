import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NetworkScanner } from "@/components/NetworkScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Network, Wifi, Router, Shield, AlertTriangle, CheckCircle, Scan } from "lucide-react";

const NetworkPage = () => {
  const { toast } = useToast();
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [networkData, setNetworkData] = useState({
    totalDevices: 24,
    vulnerableDevices: 7,
    secureDevices: 17,
    openPorts: 156,
    activeConnections: 89
  });

  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: "1",
      device: "192.168.1.45",
      type: "Open SSH Port",
      severity: "high",
      description: "SSH service running with default credentials"
    },
    {
      id: "2", 
      device: "192.168.1.67",
      type: "Outdated Firmware",
      severity: "critical",
      description: "Router firmware 3 versions behind"
    },
    {
      id: "3",
      device: "192.168.1.89",
      type: "Weak Password",
      severity: "medium", 
      description: "Default admin password detected"
    }
  ]);

  const startNetworkScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          toast({
            title: "Scan Complete",
            description: "Network vulnerability scan finished successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen matrix-grid p-6"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold nexus-header">NETWORK SCANNER</h1>
            <p className="text-muted-foreground">Discover and analyze network vulnerabilities</p>
          </div>
          <Button 
            onClick={startNetworkScan}
            disabled={isScanning}
            className="btn-3d hover-glow"
          >
            <Scan className="w-4 h-4 mr-2" />
            {isScanning ? "Scanning..." : "Start Scan"}
          </Button>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Network className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{networkData.totalDevices}</p>
              <p className="text-sm text-muted-foreground">Total Devices</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{networkData.vulnerableDevices}</p>
              <p className="text-sm text-muted-foreground">Vulnerable</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{networkData.secureDevices}</p>
              <p className="text-sm text-muted-foreground">Secure</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{networkData.openPorts}</p>
              <p className="text-sm text-muted-foreground">Open Ports</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Wifi className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{networkData.activeConnections}</p>
              <p className="text-sm text-muted-foreground">Active Connections</p>
            </CardContent>
          </Card>
        </div>

        {/* Scan Progress */}
        {isScanning && (
          <Card className="glass-panel">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Network Scan in Progress</h3>
                  <span className="text-sm text-muted-foreground">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Scanning network segments and analyzing security vulnerabilities...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vulnerabilities List */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{vuln.device}</p>
                      <Badge 
                        variant={vuln.severity === "critical" ? "destructive" : 
                                vuln.severity === "high" ? "secondary" : "outline"}
                      >
                        {vuln.severity}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{vuln.type}</p>
                    <p className="text-xs text-muted-foreground">{vuln.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Network Scanner Component */}
          <div className="lg:col-span-2">
            <NetworkScanner />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkPage;