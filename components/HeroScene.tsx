"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const palette = ["#3b6dff", "#7c5cff", "#06b6d4", "#e0408f"];

/** Glass bubble: a clear iridescent shell that holds the glowing core. */
function GlassShell() {
  return (
    <mesh renderOrder={2}>
      <icosahedronGeometry args={[1.55, 8]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        roughness={0.04}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.05}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[200, 700]}
        envMapIntensity={1.6}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.35;
      mesh.current.rotation.x += dt * 0.12;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.85, 6]} />
      <MeshDistortMaterial
        color="#7c5cff"
        emissive="#5b3df5"
        emissiveIntensity={0.55}
        roughness={0.2}
        metalness={0.1}
        distort={0.42}
        speed={2}
      />
    </mesh>
  );
}

/** A network of nodes on a sphere, connected to near neighbours.
 *  Lines are merged into one geometry and nodes are instanced, so the whole network costs only a few draw calls. */
function Network({ count = 64, radius = 2.15 }: { count?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);

  const { points, linePos, lineCol } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(radius));
    }
    const pos: number[] = [];
    const col: number[] = [];
    const c = new THREE.Color();
    let k = 0;
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++)
        if (pts[i].distanceTo(pts[j]) < radius * 0.55) {
          c.set(palette[k++ % 3]);
          pos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          col.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
    return { points: pts, linePos: new Float32Array(pos), lineCol: new Float32Array(col) };
  }, [count, radius]);

  useEffect(() => {
    const m = nodes.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    const c = new THREE.Color();
    points.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(i % 8 === 0 ? 2 : 1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      c.set(palette[i % palette.length]);
      m.setColorAt(i, c);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [points]);

  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.1;
      group.current.rotation.z += dt * 0.025;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineCol, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.32} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodes} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function Tablet({
  radius,
  speed,
  tilt,
  color,
  phase = 0,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
  phase?: number;
}) {
  const pivot = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (pivot.current) pivot.current.rotation.y += dt * speed;
    if (body.current) {
      body.current.rotation.x += dt * 0.6;
      body.current.rotation.z += dt * 0.4;
    }
  });
  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.0035, 8, 180]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <group ref={pivot} rotation={[0, phase, 0]}>
        <mesh ref={body} position={[radius, 0, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.65}
            roughness={0.05}
            clearcoat={1}
            iridescence={0.8}
            envMapIntensity={1.8}
          />
        </mesh>
      </group>
    </group>
  );
}

function Dust({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7c5cff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Eases the scene toward the pointer, and ties rotation / lift / scale to page scroll. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const s = Math.min(window.scrollY / window.innerHeight, 1.5);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.45 + s * 1.8, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.3, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, s * 1.2, 0.08);
    const sc = 1 - Math.min(s, 1) * 0.28;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, sc, 0.08));
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 45 }}
      dpr={[1, 1.35]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -4]} scale={[12, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} scale={[4, 8, 1]} color="#a5b4ff" />
        <Lightformer form="rect" intensity={2} position={[5, -1, 2]} scale={[4, 8, 1]} color="#ffb3d6" />
        <Lightformer form="circle" intensity={2} position={[0, -4, 3]} scale={4} color="#9be7ff" />
      </Environment>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Rig>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <GlassShell />
          <Core />
        </Float>
        <Network />
        <Tablet radius={2.5} speed={0.55} tilt={[0.45, 0, 0.3]} color="#06b6d4" />
        <Tablet radius={2.95} speed={-0.4} tilt={[-0.7, 0, 0.5]} color="#e0408f" phase={2} />
        <Tablet radius={3.3} speed={0.3} tilt={[1.1, 0, -0.4]} color="#3b6dff" phase={4} />
        <Dust />
      </Rig>
    </Canvas>
  );
}
