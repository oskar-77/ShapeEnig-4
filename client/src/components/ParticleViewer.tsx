import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

interface ParticleViewerProps {
  mode: string;
  customImageData?: string | null;
}

export function ParticleViewer({ mode, customImageData }: ParticleViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const homePointsRef = useRef<Float32Array | null>(null);
  const PARTICLE_COUNT = 20000;

  // --- SHAPE ALGORITHMS ---
  const updateHomePositions = (currentMode: string, customImg?: string | null) => {
    if (!homePointsRef.current) return;
    const homePoints = homePointsRef.current;

    // If custom mode with image data
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
          homePoints[i3] = p.x + (Math.random() - 0.5) * 2;
          homePoints[i3+1] = p.y + (Math.random() - 0.5) * 2;
          homePoints[i3+2] = p.z;
        }
      };
      img.src = customImg;
      return;
    }

    // Standard high-precision algorithms
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (currentMode === 'sphere') {
          // Fibonacci Sphere - Uniform distribution
          const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
          const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
          const r = 45;
          homePoints[i3] = r * Math.cos(theta) * Math.sin(phi);
          homePoints[i3+1] = r * Math.sin(theta) * Math.sin(phi);
          homePoints[i3+2] = r * Math.cos(phi);
      } else if (currentMode === 'grid') {
          // Cubic Lattice
          const s = Math.floor(Math.pow(PARTICLE_COUNT, 1/3));
          const spacing = 4.5;
          homePoints[i3] = (i % s - s/2) * spacing;
          homePoints[i3+1] = (Math.floor(i/s) % s - s/2) * spacing;
          homePoints[i3+2] = (Math.floor(i/(s*s)) - s/2) * spacing;
      } else if (currentMode === 'helix') {
          // DNA Double Helix Structure
          const angle = 0.15 * i;
          const radius = 25;
          const strand = i % 2 === 0 ? 0 : Math.PI;
          homePoints[i3] = radius * Math.cos(angle + strand);
          homePoints[i3+1] = (i / PARTICLE_COUNT) * 120 - 60;
          homePoints[i3+2] = radius * Math.sin(angle + strand);
      } else if (currentMode === 'torus') {
          // Precision Torus: R=40, r=15
          const R = 40;
          const r = 15;
          const u = (i / PARTICLE_COUNT) * Math.PI * 2;
          const v = (i % 100) * (Math.PI * 2 / 100);
          homePoints[i3] = (R + r * Math.cos(v)) * Math.cos(u);
          homePoints[i3+1] = (R + r * Math.cos(v)) * Math.sin(u);
          homePoints[i3+2] = r * Math.sin(v);
      } else if (currentMode === 'cube') {
          // Accurate Cube Volume
          const side = Math.floor(Math.pow(PARTICLE_COUNT, 1/3));
          const size = 65;
          homePoints[i3] = (i % side - side/2) * (size/side);
          homePoints[i3+1] = (Math.floor(i/side) % side - side/2) * (size/side);
          homePoints[i3+2] = (Math.floor(i/(side*side)) - side/2) * (size/side);
      } else if (currentMode === 'pyramid') {
          // Geometrically accurate Square Pyramid
          const layers = 60;
          const pPerLayer = Math.floor(PARTICLE_COUNT / layers);
          const layer = Math.floor(i / pPerLayer);
          const progress = layer / layers;
          const height = 80;
          const baseSize = 70;
          
          const side = (1 - progress) * baseSize;
          const x = (Math.random() - 0.5) * side;
          const z = (Math.random() - 0.5) * side;
          
          homePoints[i3] = x;
          homePoints[i3+1] = progress * height - height/2;
          homePoints[i3+2] = z;
      } else if (currentMode === 'cylinder') {
          // Precision Cylinder
          const h = (i / PARTICLE_COUNT) * 100 - 50;
          const r = 35;
          const angle = (i % 200) / 200 * Math.PI * 2;
          homePoints[i3] = r * Math.cos(angle);
          homePoints[i3+1] = h;
          homePoints[i3+2] = r * Math.sin(angle);
      } else if (currentMode === 'heart') {
          // Parametric Heart Curve (3D volume)
          const t = (i / PARTICLE_COUNT) * Math.PI * 2;
          const scale = 3.2;
          const x = 16 * Math.pow(Math.sin(t), 3);
          const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
          homePoints[i3] = x * scale;
          homePoints[i3+1] = y * scale;
          homePoints[i3+2] = (Math.random() - 0.5) * 15;
      } else {
          // Default: Uniform Cloud
          homePoints[i3] = (Math.random() - 0.5) * 90;
          homePoints[i3+1] = (Math.random() - 0.5) * 90;
          homePoints[i3+2] = (Math.random() - 0.5) * 90;
      }
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
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    homePointsRef.current = homePoints;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3+1] = (Math.random() - 0.5) * 300;
      positions[i3+2] = (Math.random() - 0.5) * 300;

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
        
        // Physics: Smooth seek
        const ax = (homePoints[i3] - pAttr[i3]) * 0.04;
        const ay = (homePoints[i3+1] - pAttr[i3+1]) * 0.04;
        const az = (homePoints[i3+2] - pAttr[i3+2]) * 0.04;

        velocities[i3] = (velocities[i3] + ax) * 0.93;
        velocities[i3+1] = (velocities[i3+1] + ay) * 0.93;
        velocities[i3+2] = (velocities[i3+2] + az) * 0.93;

        // Repulsion
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

  // Smoothly update positions when mode changes
  useEffect(() => {
    updateHomePositions(mode, customImageData);
  }, [mode, customImageData]);

  return <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />;
}
