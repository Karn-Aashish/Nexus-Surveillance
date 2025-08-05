import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Target {
  id: string;
  position: [number, number, number];
  name: string;
  status: 'active' | 'inactive' | 'compromised';
  threat: 'low' | 'medium' | 'high' | 'critical';
}

const mockTargets: Target[] = [
  { id: '1', position: [1.2, 0.5, 0.3], name: 'Target Alpha', status: 'active', threat: 'high' },
  { id: '2', position: [-0.8, -0.6, 0.9], name: 'Target Beta', status: 'compromised', threat: 'critical' },
  { id: '3', position: [0.3, 1.1, -0.7], name: 'Target Gamma', status: 'inactive', threat: 'low' },
  { id: '4', position: [-1.1, 0.2, -0.5], name: 'Target Delta', status: 'active', threat: 'medium' },
];

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Create wireframe sphere
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  return (
    <group>
      {/* Main globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshPhongMaterial
          color="#001122"
          transparent
          opacity={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial color="#00ffff" opacity={0.3} transparent />
      </lineSegments>

      {/* Latitude/longitude lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const points = [];
        for (let j = 0; j <= 32; j++) {
          const phi = (j / 32) * Math.PI;
          points.push(
            new THREE.Vector3(
              Math.sin(phi) * Math.cos(angle),
              Math.cos(phi),
              Math.sin(phi) * Math.sin(angle)
            )
          );
        }
        return (
          <Line
            key={`line-${i}`}
            points={points}
          >
            <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
          </Line>
        );
      })}
    </group>
  );
}

function TargetMarker({ target }: { target: Target }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const color = {
    low: '#22c55e',
    medium: '#f59e0b', 
    high: '#f97316',
    critical: '#ef4444'
  }[target.threat];

  const statusColor = {
    active: '#22c55e',
    inactive: '#6b7280',
    compromised: '#ef4444'
  }[target.status];

  return (
    <group position={target.position}>
      {/* Target marker */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Threat level ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.05, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Status indicator */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.01, 6, 6]} />
        <meshBasicMaterial color={statusColor} />
      </mesh>

      {/* Data connection lines to globe surface */}
      <Line
        points={[
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...target.position).normalize()
        ]}
      >
        <lineBasicMaterial color="#00ffff" transparent opacity={0.4} />
      </Line>

      {/* Hover label */}
      <Html position={[0, 0.1, 0]} center>
        <div className="pointer-events-none bg-black/80 text-primary text-xs px-2 py-1 rounded border border-primary/30 whitespace-nowrap">
          {target.name}
          <div className="text-xs text-muted-foreground">
            {target.threat.toUpperCase()} | {target.status.toUpperCase()}
          </div>
        </div>
      </Html>
    </group>
  );
}

function ScanLines() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1.1, 1.1, 0.01, 32, 1, true]} />
      <meshBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.3} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function HolographicGlobe() {
  return (
    <div className="w-full h-[600px] bg-black/20 rounded-lg border border-primary/30 relative overflow-hidden glass-panel">
      {/* Scanner line effect */}
      <div className="absolute inset-0 scanner-line" />
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff0080" />

        {/* Globe */}
        <Globe />

        {/* Target markers */}
        {mockTargets.map((target) => (
          <TargetMarker key={target.id} target={target} />
        ))}

        {/* Scanning animation */}
        <ScanLines />

        {/* Orbital rings */}
        {[1.3, 1.5, 1.7].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.005, 64]} />
            <meshBasicMaterial 
              color="#00ffff" 
              transparent 
              opacity={0.1 - i * 0.02} 
            />
          </mesh>
        ))}
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="glass-panel p-3 border border-primary/30">
          <div className="text-sm text-primary font-mono">GLOBAL SURVEILLANCE</div>
          <div className="text-xs text-muted-foreground mt-1">
            {mockTargets.length} Active Targets
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-2">THREAT LEVELS</div>
          {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((level, i) => (
            <div key={level} className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#22c55e'][i] 
                }}
              />
              <span className="text-xs text-muted-foreground">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
        <div className="text-xs text-muted-foreground font-mono">
          SCANNING... {Math.floor(Math.random() * 1000 + 5000)} NODES
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">SYSTEM ONLINE</span>
        </div>
      </div>
    </div>
  );
}