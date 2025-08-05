import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Target, MapPin, Clock, Activity, Eye, Plus, Search, Filter } from "lucide-react";

const TargetsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [targets, setTargets] = useState([
    {
      id: "T001",
      name: "Alex Thompson",
      codename: "Alpha",
      status: "active",
      priority: "high",
      location: "New York, US",
      lastActivity: "2 minutes ago",
      devices: 3,
      threat_level: "medium",
      department: "Finance"
    },
    {
      id: "T002", 
      name: "Sarah Chen",
      codename: "Beta",
      status: "monitoring",
      priority: "critical",
      location: "London, UK",
      lastActivity: "15 minutes ago",
      devices: 2,
      threat_level: "high",
      department: "IT Security"
    },
    {
      id: "T003",
      name: "Marcus Rodriguez",
      codename: "Gamma",
      status: "inactive",
      priority: "low",
      location: "Tokyo, JP",
      lastActivity: "2 hours ago",
      devices: 1,
      threat_level: "low",
      department: "Operations"
    },
    {
      id: "T004",
      name: "Emma Wilson",
      codename: "Delta",
      status: "active",
      priority: "medium",
      location: "Berlin, DE",
      lastActivity: "5 minutes ago",
      devices: 4,
      threat_level: "medium",
      department: "Research"
    }
  ]);

  const handleStartSurveillance = (targetId: string) => {
    const target = targets.find(t => t.id === targetId);
    toast({
      title: "Surveillance Initiated",
      description: `Started monitoring ${target?.name} (${target?.codename})`,
    });
  };

  const filteredTargets = targets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.codename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || target.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const targetStats = {
    total: targets.length,
    active: targets.filter(t => t.status === "active").length,
    monitoring: targets.filter(t => t.status === "monitoring").length,
    inactive: targets.filter(t => t.status === "inactive").length,
    highPriority: targets.filter(t => t.priority === "high" || t.priority === "critical").length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "monitoring": return "bg-yellow-500";
      case "inactive": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "secondary";
      case "medium": return "outline";
      case "low": return "outline";
      default: return "outline";
    }
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
            <h1 className="text-3xl font-bold nexus-header">TARGET MANAGEMENT</h1>
            <p className="text-muted-foreground">Monitor and track surveillance targets</p>
          </div>
          <Button className="btn-3d hover-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add Target
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{targetStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Targets</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-2xl font-bold text-green-400">{targetStats.active}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
              <p className="text-2xl font-bold text-yellow-400">{targetStats.monitoring}</p>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2"></div>
              <p className="text-2xl font-bold text-gray-400">{targetStats.inactive}</p>
              <p className="text-sm text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{targetStats.highPriority}</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
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
                  placeholder="Search targets..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Targets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTargets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-panel hover-glow btn-3d">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {target.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{target.name}</p>
                        <p className="text-sm text-muted-foreground">Codename: {target.codename}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(target.status)}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={getPriorityVariant(target.priority)}>
                      {target.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{target.threat_level}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{target.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Last seen: {target.lastActivity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span>{target.devices} devices monitored</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Department: {target.department}</p>
                    <Button 
                      size="sm" 
                      className="w-full btn-3d"
                      onClick={() => handleStartSurveillance(target.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Start Surveillance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTargets.length === 0 && (
          <Card className="glass-panel">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No targets found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default TargetsPage;