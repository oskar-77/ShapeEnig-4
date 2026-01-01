export const bezier = (i: number, count: number) => {
  const t = i / count;
  // Define control points for a more dramatic S-curve
  const p0 = { x: -80, y: -40, z: -20 };
  const p1 = { x: -40, y: 120, z: 60 };
  const p2 = { x: 40, y: -120, z: -60 };
  const p3 = { x: 80, y: 40, z: 20 };
  
  const it = 1 - t;
  const x = it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x;
  const y = it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y;
  const z = it*it*it*p0.z + 3*it*it*t*p1.z + 3*it*t*t*p2.z + t*t*t*p3.z;
  
  // Add some volume around the curve
  const angle = Math.random() * Math.PI * 2;
  const r = 2 + Math.random() * 3;
  
  return {
    x: x + Math.cos(angle) * r,
    y: y + Math.sin(angle) * r,
    z: z + (Math.random() - 0.5) * 2
  };
};
