import { useState } from "react";
import { motion } from "framer-motion";
import { HolographicGlobe } from "@/components/HolographicGlobe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Activity, AlertTriangle } from "lucide-react";

const LocationsPage = () => {
  const [locations, setLocations] = useState([
    {
      id: "LOC001",
      name: "New York HQ",
      country: "United States",
      coordinates: "40.7128, -74.0060",
      activeTargets: 12,
      totalDevices: 45,
      threatLevel: "medium",
      lastActivity: "2 minutes ago",
      status: "active"
    },
    {
      id: "LOC002",
      name: "London Office", 
      country: "United Kingdom",
      coordinates: "51.5074, -0.1278",
      activeTargets: 8,
      totalDevices: 32,
      threatLevel: "high",
      lastActivity: "5 minutes ago",
      status: "active"
    },
    {
      id: "LOC003",
      name: "Tokyo Branch",
      country: "Japan", 
      coordinates: "35.6762, 139.6503",
      activeTargets: 6,
      totalDevices: 28,
      threatLevel: "low",
      lastActivity: "1 hour ago",
      status: "monitoring"
    },
    {
      id: "LOC004",
      name: "Berlin Office",
      country: "Germany",
      coordinates: "52.5200, 13.4050",
      activeTargets: 15,
      totalDevices: 52,
      threatLevel: "critical",
      lastActivity: "30 seconds ago",
      status: "active"
    },
    {
      id: "LOC005",
      name: "Sydney Office",
      country: "Australia",
      coordinates: "-33.8688, 151.2093",
      activeTargets: 4,
      totalDevices: 18,
      threatLevel: "low",
      lastActivity: "3 hours ago",
      status: "offline"
    }
  ]);

  const getThreatColor = (level: string) => {
    switch (level) {
      case "critical": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "high": return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "low": return "text-green-400 bg-green-500/10 border-green-500/30";
      default: return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "monitoring": return "secondary";
      case "offline": return "outline";
      default: return "outline";
    }
  };

  const locationStats = {
    total: locations.length,
    active: locations.filter(l => l.status === "active").length,
    totalTargets: locations.reduce((sum, l) => sum + l.activeTargets, 0),
    totalDevices: locations.reduce((sum, l) => sum + l.totalDevices, 0),
    criticalLocations: locations.filter(l => l.threatLevel === "critical").length
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen matrix-grid p-6"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold nexus-header">GLOBAL LOCATIONS</h1>
          <p className="text-muted-foreground">Monitor surveillance operations worldwide</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{locationStats.total}</p>
              <p className="text-sm text-muted-foreground">Locations</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{locationStats.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{locationStats.totalTargets}</p>
              <p className="text-sm text-muted-foreground">Targets</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{locationStats.totalDevices}</p>
              <p className="text-sm text-muted-foreground">Devices</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{locationStats.criticalLocations}</p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Global Map */}
          <div className="lg:col-span-2">
            <HolographicGlobe />
          </div>

          {/* Locations List */}
          <div className="space-y-4">
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Active Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {locations.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{location.name}</p>
                        <p className="text-xs text-muted-foreground">{location.country}</p>
                      </div>
                      <Badge variant={getStatusVariant(location.status)} className="text-xs">
                        {location.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs ${getThreatColor(location.threatLevel)}`}>
                        {location.threatLevel.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{location.lastActivity}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{location.activeTargets} targets</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>{location.totalDevices} devices</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationsPage;