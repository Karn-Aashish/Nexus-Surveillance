import { useState } from "react";
import { motion } from "framer-motion";
import { DeviceCard } from "@/components/DeviceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Filter, Laptop, Smartphone, Tablet } from "lucide-react";

const DevicesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
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
    },
    {
      id: "4",
      name: "Server Delta",
      type: "laptop" as const,
      status: "online" as const,
      lastSeen: "1 minute ago",
      location: "Berlin, DE",
      ipAddress: "10.0.0.67",
      osInfo: "Ubuntu 22.04"
    },
    {
      id: "5",
      name: "Mobile Epsilon",
      type: "mobile" as const,
      status: "offline" as const,
      lastSeen: "3 hours ago",
      location: "Paris, FR",
      batteryLevel: 45,
      ipAddress: "192.168.1.89",
      osInfo: "iOS 17"
    }
  ]);

  const handleStartMonitoring = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    toast({
      title: "Monitoring Started",
      description: `Surveillance initiated for ${device?.name}`,
    });
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || device.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const deviceStats = {
    total: devices.length,
    online: devices.filter(d => d.status === "online").length,
    offline: devices.filter(d => d.status === "offline").length,
    mobile: devices.filter(d => d.type === "mobile").length,
    laptop: devices.filter(d => d.type === "laptop").length,
    tablet: devices.filter(d => d.type === "tablet").length,
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
            <h1 className="text-3xl font-bold nexus-header">DEVICE MANAGEMENT</h1>
            <p className="text-muted-foreground">Monitor and control all surveillance targets</p>
          </div>
          <Button className="btn-3d hover-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="glass-panel">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{deviceStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Devices</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{deviceStats.online}</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-400">{deviceStats.offline}</p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-4 text-center flex flex-col items-center">
              <Smartphone className="w-6 h-6 text-primary mb-1" />
              <p className="text-lg font-bold">{deviceStats.mobile}</p>
              <p className="text-xs text-muted-foreground">Mobile</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-4 text-center flex flex-col items-center">
              <Laptop className="w-6 h-6 text-primary mb-1" />
              <p className="text-lg font-bold">{deviceStats.laptop}</p>
              <p className="text-xs text-muted-foreground">Laptop</p>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardContent className="p-4 text-center flex flex-col items-center">
              <Tablet className="w-6 h-6 text-primary mb-1" />
              <p className="text-lg font-bold">{deviceStats.tablet}</p>
              <p className="text-xs text-muted-foreground">Tablet</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-panel">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeviceCard {...device} onMonitor={handleStartMonitoring} />
            </motion.div>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <Card className="glass-panel">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No devices found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default DevicesPage;