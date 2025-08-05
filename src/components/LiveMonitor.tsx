import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Eye, 
  EyeOff,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Wifi,
  Battery,
  Signal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveMonitorProps {
  targetId: string;
  targetName: string;
  className?: string;
}

export function LiveMonitor({ targetId, targetName, className }: LiveMonitorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dataCollected, setDataCollected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRecording) {
        setProgress(prev => (prev + 1) % 100);
        setDataCollected(prev => prev + Math.random() * 50);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setProgress(0);
  };

  const handleDownload = () => {
    // Simulate download action
    console.log(`Downloading surveillance data for ${targetName}`);
  };

  return (
    <Card className={cn("glass-panel hover-glow", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="hologram-text text-lg font-bold">
              LIVE MONITOR
            </div>
            <Badge variant="secondary" className="text-xs">
              {targetName}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "status-indicator",
              isRecording ? "bg-red-500" : "bg-gray-500"
            )} />
            <span className="text-xs text-muted-foreground">
              {isRecording ? "RECORDING" : "STANDBY"}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Feed Simulation */}
        <div className="relative aspect-video bg-black rounded-lg border border-primary/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Simulated camera feed */}
            <div className="absolute inset-4 border border-green-500/30 rounded">
              <div className="text-green-400 text-xs absolute top-2 left-2 font-mono">
                CAM-01 | {new Date().toLocaleTimeString()}
              </div>
              <div className="text-green-400 text-xs absolute top-2 right-2 font-mono">
                REC ●
              </div>
              
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border border-green-500/50">
                  <div className="absolute inset-0 border-t border-l border-green-500/80" />
                  <div className="absolute top-0 right-0 border-t border-r border-green-500/80 w-2 h-2" />
                  <div className="absolute bottom-0 left-0 border-b border-l border-green-500/80 w-2 h-2" />
                  <div className="absolute bottom-0 right-0 border-b border-r border-green-500/80 w-2 h-2" />
                </div>
              </div>

              {/* Scan lines */}
              <div className="absolute inset-0 scanner-line" />
            </div>
          </div>

          {/* Video controls overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="btn-3d"
              >
                {isRecording ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={cn("btn-3d", !isVideoEnabled && "text-red-400")}
              >
                {isVideoEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={cn("btn-3d", !isAudioEnabled && "text-red-400")}
              >
                {isAudioEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              </Button>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleDownload}
              className="btn-3d"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Recording Progress */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Recording Progress</span>
                <span className="text-primary font-mono">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Target Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="glass-panel p-3 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Location</span>
            </div>
            <div className="text-sm font-mono text-foreground">
              40.7128° N, 74.0060° W
            </div>
            <div className="text-xs text-muted-foreground">New York, NY</div>
          </motion.div>

          <motion.div 
            className="glass-panel p-3 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Last Active</span>
            </div>
            <div className="text-sm font-mono text-foreground">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="text-xs text-muted-foreground">Real-time</div>
          </motion.div>

          <motion.div 
            className="glass-panel p-3 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Signal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-mono text-green-400">Strong</div>
              <Signal className="w-3 h-3 text-green-400" />
            </div>
          </motion.div>

          <motion.div 
            className="glass-panel p-3 border border-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Battery</span>
            </div>
            <div className="text-sm font-mono text-foreground">78%</div>
            <div className="w-full bg-secondary rounded-full h-1 mt-1">
              <div className="bg-primary h-1 rounded-full" style={{ width: "78%" }} />
            </div>
          </motion.div>
        </div>

        {/* Data Collection Stats */}
        <div className="glass-panel p-3 border border-primary/20 data-stream">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Data Collected</span>
            <Badge variant="secondary" className="text-xs text-primary">
              {dataCollected.toFixed(1)} MB
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Audio</div>
              <div className="text-foreground font-mono">{(dataCollected * 0.3).toFixed(1)} MB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Video</div>
              <div className="text-foreground font-mono">{(dataCollected * 0.6).toFixed(1)} MB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Metadata</div>
              <div className="text-foreground font-mono">{(dataCollected * 0.1).toFixed(1)} MB</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}