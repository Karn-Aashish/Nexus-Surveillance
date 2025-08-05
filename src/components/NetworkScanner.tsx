import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Wifi, 
  Router, 
  Smartphone, 
  Laptop, 
  Monitor,
  Shield,
  AlertTriangle,
  Lock,
  Unlock,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NetworkDevice {
  id: string;
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  type: 'router' | 'mobile' | 'laptop' | 'desktop' | 'iot' | 'unknown';
  status: 'online' | 'offline';
  security: 'secure' | 'vulnerable' | 'compromised';
  ports: number[];
  lastSeen: string;
}

const mockDevices: NetworkDevice[] = [
  {
    id: '1',
    ip: '192.168.1.1',
    mac: '00:1B:44:11:3A:B7',
    hostname: 'ROUTER-MAIN',
    vendor: 'Cisco',
    type: 'router',
    status: 'online',
    security: 'secure',
    ports: [22, 80, 443],
    lastSeen: '2024-01-20 14:32:15'
  },
  {
    id: '2',
    ip: '192.168.1.105',
    mac: '00:50:56:C0:00:08',
    hostname: 'JOHN-IPHONE',
    vendor: 'Apple',
    type: 'mobile',
    status: 'online',
    security: 'vulnerable',
    ports: [62078, 62079],
    lastSeen: '2024-01-20 14:30:22'
  },
  {
    id: '3',
    ip: '192.168.1.150',
    mac: '08:00:27:12:34:56',
    hostname: 'WORKSTATION-01',
    vendor: 'Dell',
    type: 'laptop',
    status: 'online',
    security: 'compromised',
    ports: [22, 3389, 5900],
    lastSeen: '2024-01-20 14:25:10'
  }
];

const deviceIcons = {
  router: Router,
  mobile: Smartphone,
  laptop: Laptop,
  desktop: Monitor,
  iot: Wifi,
  unknown: Globe
};

const securityColors = {
  secure: 'text-green-400',
  vulnerable: 'text-yellow-400',
  compromised: 'text-red-400'
};

export function NetworkScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [targetNetwork, setTargetNetwork] = useState('192.168.1.0/24');
  const [discoveredDevices, setDiscoveredDevices] = useState<NetworkDevice[]>(mockDevices);

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setScanProgress(i);
    }
    
    setIsScanning(false);
    // Add some random devices during scan
    const newDevices = mockDevices.map(device => ({
      ...device,
      lastSeen: new Date().toLocaleString()
    }));
    setDiscoveredDevices(newDevices);
  };

  const handlePenetrate = (deviceId: string) => {
    setDiscoveredDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, security: 'compromised' as const }
          : device
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Scanner Control Panel */}
      <Card className="glass-panel hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="hologram-border p-2 rounded">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <span className="hologram-text">NETWORK SCANNER</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">
                Target Network
              </label>
              <Input
                value={targetNetwork}
                onChange={(e) => setTargetNetwork(e.target.value)}
                placeholder="192.168.1.0/24"
                className="font-mono bg-secondary/20 border-primary/30"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleStartScan}
                disabled={isScanning}
                className="btn-3d px-6"
                variant={isScanning ? "secondary" : "default"}
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </div>
          </div>

          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Scan Progress</span>
                <span className="text-primary font-mono">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-3" />
              <div className="text-xs text-muted-foreground font-mono">
                Scanning {targetNetwork}... Found {discoveredDevices.length} devices
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Discovered Devices */}
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Discovered Devices
            </div>
            <Badge variant="secondary" className="text-primary">
              {discoveredDevices.length} Found
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {discoveredDevices.map((device, index) => {
              const DeviceIcon = deviceIcons[device.type];
              const securityColor = securityColors[device.security];

              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-4 border border-primary/20 hover-glow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <DeviceIcon className="w-8 h-8 text-primary" />
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-3 h-3 rounded-full",
                          device.status === 'online' ? "bg-green-500" : "bg-red-500"
                        )} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {device.hostname}
                          </span>
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs", securityColor)}
                          >
                            {device.security.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {device.ip} • {device.vendor}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          MAC: {device.mac}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {device.security === 'secure' && (
                        <Lock className="w-4 h-4 text-green-400" />
                      )}
                      {device.security === 'vulnerable' && (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                      {device.security === 'compromised' && (
                        <Unlock className="w-4 h-4 text-red-400" />
                      )}

                      {device.security !== 'compromised' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handlePenetrate(device.id)}
                          className="btn-3d"
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          Penetrate
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Device details */}
                  <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Open Ports</span>
                      <div className="text-foreground font-mono">
                        {device.ports.join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Seen</span>
                      <div className="text-foreground font-mono">
                        {device.lastSeen}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type</span>
                      <div className="text-foreground capitalize">
                        {device.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}