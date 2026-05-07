import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';

function FloatingCubes() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  const cubes = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ],
      size: [Math.random() * 0.5 + 0.1, Math.random() * 0.5 + 0.1, Math.random() * 0.5 + 0.1],
    }));
  }, []);

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <Float
          key={i}
          speed={1.5} 
          rotationIntensity={2} 
          floatIntensity={2}
          position={cube.position}
        >
          <mesh>
            <boxGeometry args={cube.size} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#FF6B00' : '#8B0000'} 
              emissive={i % 2 === 0 ? '#cc5600' : '#4a0000'}
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Stars() {
  const ref = useRef();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0005;
      ref.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff8b33"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Background3D = () => {
  return (
    <div className="bg-3d">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF6B00" />
        <Stars />
        <FloatingCubes />
        <fog attach="fog" args={['#050505', 5, 20]} />
      </Canvas>
    </div>
  );
};

export default Background3D;
