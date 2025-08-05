import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Database, Download, FileText, Image, Video, Music, Archive, Play, Pause, Square } from "lucide-react";

const ExtractionPage = () => {
  const { toast } = useToast();
  const [activeExtractions, setActiveExtractions] = useState([
    {
      id: "EXT001",
      target: "Target Alpha",
      type: "Full System",
      progress: 78,
      status: "running",
      timeRemaining: "12 minutes",
      dataSize: "2.4 GB"
    },
    {
      id: "EXT002", 
      target: "Workstation Beta",
      type: "Browser Data",
      progress: 45,
      status: "running",
      timeRemaining: "8 minutes",
      dataSize: "456 MB"
    },
    {
      id: "EXT003",
      target: "Mobile Gamma",
      type: "Messages & Contacts",
      progress: 100,
      status: "completed",
      timeRemaining: "Completed",
      dataSize: "128 MB"
    }
  ]);

  const [extractionHistory, setExtractionHistory] = useState([
    {
      id: "HIS001",
      target: "Target Alpha",
      type: "Documents",
      completedAt: "2 hours ago",
      dataSize: "1.2 GB",
      files: 2847,
      status: "success"
    },
    {
      id: "HIS002",
      target: "Server Delta", 
      type: "Database Backup",
      completedAt: "5 hours ago",
      dataSize: "8.9 GB",
      files: 1,
      status: "success"
    },
    {
      id: "HIS003",
      target: "Mobile Epsilon",
      type: "Photos & Videos",
      completedAt: "1 day ago",
      dataSize: "3.4 GB",
      files: 1452,
      status: "partial"
    }
  ]);

  const startNewExtraction = (type: string) => {
    toast({
      title: "Extraction Started",
      description: `${type} extraction has been initiated`,
    });
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("Database")) return <Database className="w-4 h-4" />;
    if (type.includes("Documents")) return <FileText className="w-4 h-4" />;
    if (type.includes("Photos")) return <Image className="w-4 h-4" />;
    if (type.includes("Videos")) return <Video className="w-4 h-4" />;
    if (type.includes("Messages")) return <FileText className="w-4 h-4" />;
    return <Archive className="w-4 h-4" />;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "running": return "secondary";
      case "completed": return "default";
      case "success": return "default";
      case "partial": return "secondary";
      case "failed": return "destructive";
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
            <h1 className="text-3xl font-bold nexus-header">DATA EXTRACTION</h1>
            <p className="text-muted-foreground">Extract and analyze target data</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => startNewExtraction("Quick Scan")}
              variant="outline" 
              className="btn-3d"
            >
              Quick Scan
            </Button>
            <Button 
              onClick={() => startNewExtraction("Full Extraction")}
              className="btn-3d hover-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              New Extraction
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Extractions */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Active Extractions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeExtractions.map((extraction) => (
                  <div key={extraction.id} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{extraction.target}</p>
                        <p className="text-sm text-muted-foreground">{extraction.type}</p>
                      </div>
                      <Badge variant={getStatusVariant(extraction.status)}>
                        {extraction.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {extraction.progress}%</span>
                        <span>{extraction.timeRemaining}</span>
                      </div>
                      <Progress value={extraction.progress} className="w-full" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Data size: {extraction.dataSize}</span>
                        {extraction.status === "running" && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Pause className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Square className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Extraction History */}
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5 text-primary" />
                  Extraction History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {extractionHistory.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium text-sm">{item.target}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(item.status)} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {item.completedAt} • {item.dataSize} • {item.files.toLocaleString()} files
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Quick Extractions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => startNewExtraction("Browser Data")}
                  className="w-full justify-start btn-3d" 
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Browser Data
                </Button>
                <Button 
                  onClick={() => startNewExtraction("Document Files")}
                  className="w-full justify-start btn-3d" 
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Documents
                </Button>
                <Button 
                  onClick={() => startNewExtraction("Media Files")}
                  className="w-full justify-start btn-3d" 
                  size="sm"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Photos & Videos
                </Button>
                <Button 
                  onClick={() => startNewExtraction("System Logs")}
                  className="w-full justify-start btn-3d" 
                  size="sm"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  System Logs
                </Button>
                <Button 
                  onClick={() => startNewExtraction("Network Traffic")}
                  className="w-full justify-start btn-3d" 
                  size="sm"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Network Data
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="glass-panel hover-glow">
              <CardHeader>
                <CardTitle>Extraction Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">47.2 GB</p>
                  <p className="text-sm text-muted-foreground">Total Extracted</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <p className="text-xl font-bold">156</p>
                    <p className="text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">3</p>
                    <p className="text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtractionPage;