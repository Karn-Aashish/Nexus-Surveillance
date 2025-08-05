import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Camera, Video, Mic, Eye, MapPin, Settings, Play, Square } from "lucide-react";

const CamerasPage = () => {
  const { toast } = useToast();
  
  const [cameras, setCameras] = useState([
    {
      id: "CAM001",
      name: "Office Building - Lobby",
      location: "New York HQ - Floor 1",
      status: "online",
      recording: true,
      audio: true,
      resolution: "4K",
      lastFrame: "2 seconds ago"
    },
    {
      id: "CAM002", 
      name: "Server Room - Main",
      location: "London Office - Basement",
      status: "online",
      recording: false,
      audio: false,
      resolution: "1080p",
      lastFrame: "5 seconds ago"
    },
    {
      id: "CAM003",
      name: "Conference Room A",
      location: "Tokyo Branch - Floor 12",
      status: "offline",
      recording: false,
      audio: true,
      resolution: "720p",
      lastFrame: "2 hours ago"
    },
    {
      id: "CAM004",
      name: "Parking Garage",
      location: "Berlin Office - Underground",
      status: "online",
      recording: true,
      audio: false,
      resolution: "1080p",
      lastFrame: "1 second ago"
    },
    {
      id: "CAM005",
      name: "Executive Office",
      location: "Paris HQ - Floor 15",
      status: "online",
      recording: true,
      audio: true,
      resolution: "4K",
      lastFrame: "3 seconds ago"
    },
    {
      id: "CAM006",
      name: "Data Center",
      location: "Sydney Office - Floor 3",
      status: "maintenance",
      recording: false,
      audio: false,
      resolution: "1080p",
      lastFrame: "30 minutes ago"
    }
  ]);

  const handleToggleRecording = (cameraId: string) => {
    setCameras(cameras.map(cam => 
      cam.id === cameraId ? { ...cam, recording: !cam.recording } : cam
    ));
    const camera = cameras.find(c => c.id === cameraId);
    toast({
      title: camera?.recording ? "Recording Stopped" : "Recording Started",
      description: `${camera?.name} recording status changed`,
    });
  };

  const handleToggleAudio = (cameraId: string) => {
    setCameras(cameras.map(cam => 
      cam.id === cameraId ? { ...cam, audio: !cam.audio } : cam
    ));
    const camera = cameras.find(c => c.id === cameraId);
    toast({
      title: camera?.audio ? "Audio Disabled" : "Audio Enabled",
      description: `${camera?.name} audio monitoring changed`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "offline": return "bg-red-500";
      case "maintenance": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "online": return "default";
      case "offline": return "destructive";
      case "maintenance": return "secondary";
      default: return "outline";
    }
  };

  const cameraStats = {
    total: cameras.length,
    online: cameras.filter(c => c.status === "online").length,
    recording: cameras.filter(c => c.recording).length,
    withAudio: cameras.filter(c => c.audio).length
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
            <h1 className="text-3xl font-bold nexus-header">CAMERA SURVEILLANCE</h1>
            <p className="text-muted-foreground">Monitor and control surveillance cameras</p>
          </div>
          <Button className="btn-3d hover-glow">
            <Camera className="w-4 h-4 mr-2" />
            Add Camera
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{cameraStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Cameras</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-2xl font-bold text-green-400">{cameraStats.online}</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Video className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{cameraStats.recording}</p>
              <p className="text-sm text-muted-foreground">Recording</p>
            </CardContent>
          </Card>
          <Card className="glass-panel hover-glow">
            <CardContent className="p-4 text-center">
              <Mic className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{cameraStats.withAudio}</p>
              <p className="text-sm text-muted-foreground">With Audio</p>
            </CardContent>
          </Card>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-panel hover-glow btn-3d">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-muted-foreground" />
                        </div>
                        {camera.recording && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{camera.name}</p>
                        <p className="text-sm text-muted-foreground">{camera.id}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(camera.status)}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={getStatusVariant(camera.status)}>
                      {camera.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{camera.resolution}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{camera.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span>Last frame: {camera.lastFrame}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span className="text-sm">Recording</span>
                      </div>
                      <Switch
                        checked={camera.recording}
                        onCheckedChange={() => handleToggleRecording(camera.id)}
                        disabled={camera.status !== "online"}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm">Audio</span>
                      </div>
                      <Switch
                        checked={camera.audio}
                        onCheckedChange={() => handleToggleAudio(camera.id)}
                        disabled={camera.status !== "online"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button size="sm" variant="outline" className="btn-3d">
                        <Play className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="btn-3d">
                        <Settings className="w-4 h-4 mr-1" />
                        Config
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CamerasPage;