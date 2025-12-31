import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sphere } from "../lib/shapes/sphere";
import { cube } from "../lib/shapes/cube";
import { line } from "../lib/shapes/line";
import { torus } from "../lib/shapes/torus";
import { helix } from "../lib/shapes/helix";
import { heart } from "../lib/shapes/heart";
import { pyramid } from "../lib/shapes/pyramid";
import { cylinder } from "../lib/shapes/cylinder";

interface ParticleViewerProps {
  mode: string;
  customImageData?: string | null;
}

export function ParticleViewer({ mode, customImageData }: ParticleViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const homePointsRef = useRef<Float32Array | null>(null);
  const targetPointsRef = useRef<Float32Array | null>(null);
  const PARTICLE_COUNT = 20000;

  const updateHomePositions = (currentMode: string, customImg?: string | null) => {
    if (!targetPointsRef.current) return;
    const targetPoints = targetPointsRef.current;

    if (currentMode === 'custom' && customImg) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const size = 120;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        const validPoints: {x: number, y: number, z: number}[] = [];
        for (let y = 0; y < size; y += 2) {
          for (let x = 0; x < size; x += 2) {
            const idx = (y * size + x) * 4;
            const brightness = (data[idx] + data[idx+1] + data[idx+2]) / 3;
            if (brightness > 60) {
              validPoints.push({
                x: (x - size/2) * 1.5,
                y: -(y - size/2) * 1.5,
                z: (Math.random() - 0.5) * 10
              });
            }
          }
        }
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          const p = validPoints[i % validPoints.length] || {x:0, y:0, z:0};
          targetPoints[i3] = p.x + (Math.random() - 0.5) * 2;
          targetPoints[i3+1] = p.y + (Math.random() - 0.5) * 2;
          targetPoints[i3+2] = p.z;
        }
      };
      img.src = customImg;
      return;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let p;
      switch (currentMode) {
        case 'sphere': p = sphere(i, PARTICLE_COUNT); break;
        case 'cube': p = cube(i, PARTICLE_COUNT); break;
        case 'line': p = line(i, PARTICLE_COUNT); break;
        case 'torus': p = torus(i, PARTICLE_COUNT); break;
        case 'helix': p = helix(i, PARTICLE_COUNT); break;
        case 'heart': p = heart(i, PARTICLE_COUNT); break;
        case 'pyramid': p = pyramid(i, PARTICLE_COUNT); break;
        case 'cylinder': p = cylinder(i, PARTICLE_COUNT); break;
        default: p = { x: (Math.random() - 0.5) * 90, y: (Math.random() - 0.5) * 90, z: (Math.random() - 0.5) * 90 };
      }
      targetPoints[i3] = p.x;
      targetPoints[i3+1] = p.y;
      targetPoints[i3+2] = p.z;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const homePoints = new Float32Array(PARTICLE_COUNT * 3);
    const targetPoints = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    homePointsRef.current = homePoints;
    targetPointsRef.current = targetPoints;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3+1] = (Math.random() - 0.5) * 300;
      positions[i3+2] = (Math.random() - 0.5) * 300;
      homePoints[i3] = positions[i3];
      homePoints[i3+1] = positions[i3+1];
      homePoints[i3+2] = positions[i3+2];
      targetPoints[i3] = homePoints[i3];
      targetPoints[i3+1] = homePoints[i3+1];
      targetPoints[i3+2] = homePoints[i3+2];

      const ratio = i / PARTICLE_COUNT;
      colors[i3] = ratio * 0.47;
      colors[i3+1] = 1 - ratio;
      colors[i3+2] = 0.8 + ratio * 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const mouse = new THREE.Vector2();
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalfX);
      mouse.y = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onMouseMove);

    updateHomePositions(mode, customImageData);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0015;
      const pAttr = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        homePoints[i3] += (targetPoints[i3] - homePoints[i3]) * 0.05;
        homePoints[i3+1] += (targetPoints[i3+1] - homePoints[i3+1]) * 0.05;
        homePoints[i3+2] += (targetPoints[i3+2] - homePoints[i3+2]) * 0.05;

        const ax = (homePoints[i3] - pAttr[i3]) * 0.04;
        const ay = (homePoints[i3+1] - pAttr[i3+1]) * 0.04;
        const az = (homePoints[i3+2] - pAttr[i3+2]) * 0.04;

        velocities[i3] = (velocities[i3] + ax) * 0.93;
        velocities[i3+1] = (velocities[i3+1] + ay) * 0.93;
        velocities[i3+2] = (velocities[i3+2] + az) * 0.93;

        const mx = (mouse.x / windowHalfX) * 120;
        const my = -(mouse.y / windowHalfY) * 120;
        const dx = mx - pAttr[i3];
        const dy = my - pAttr[i3+1];
        const distSq = dx*dx + dy*dy;
        
        if (distSq < 2000) {
            const force = (2000 - distSq) / 2000;
            velocities[i3] -= dx * force * 0.03;
            velocities[i3+1] -= dy * force * 0.03;
            velocities[i3+2] += Math.sin(distSq * 0.01) * force * 2;
        }

        pAttr[i3] += velocities[i3];
        pAttr[i3+1] += velocities[i3+1];
        pAttr[i3+2] += velocities[i3+2];
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current) containerRef.current.innerHTML = '';
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    updateHomePositions(mode, customImageData);
  }, [mode, customImageData]);

  return <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />;
}
