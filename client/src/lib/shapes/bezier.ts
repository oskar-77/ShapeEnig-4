export const bezier = (i: number, count: number) => {
  const t = i / count;
  
  // Define 3D control points for a complex elegant curve
  const p0 = { x: -60, y: -60, z: -40 };
  const p1 = { x: -100, y: 100, z: 80 };
  const p2 = { x: 100, y: -100, z: -80 };
  const p3 = { x: 60, y: 60, z: 40 };
  
  const it = 1 - t;
  
  // Cubic Bezier Formula
  const bx = it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x;
  const by = it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y;
  const bz = it*it*it*p0.z + 3*it*it*t*p1.z + 3*it*t*t*p2.z + t*t*t*p3.z;
  
  // Add a "glowing tube" effect around the curve
  const angle = (i * 0.1) % (Math.PI * 2);
  const radius = 3 + Math.sin(t * Math.PI * 4) * 2; // Pulsing radius
  
  // Perpendicular vectors (approximate for visualization)
  const tx = Math.cos(angle) * radius;
  const ty = Math.sin(angle) * radius;
  
  return {
    x: bx + tx,
    y: by + ty,
    z: bz + (Math.random() - 0.5) * 2
  };
};
