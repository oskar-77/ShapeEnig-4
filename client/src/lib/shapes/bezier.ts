export const bezier = (i: number, count: number) => {
  const t = i / count;
  const p0 = { x: -60, y: -40, z: 0 };
  const p1 = { x: -20, y: 80, z: 40 };
  const p2 = { x: 20, y: -80, z: -40 };
  const p3 = { x: 60, y: 40, z: 0 };
  
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;
  
  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;
  
  const cz = 3 * (p1.z - p0.z);
  const bz = 3 * (p2.z - p1.z) - cz;
  const az = p3.z - p0.z - cz - bz;
  
  return {
    x: ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x,
    y: ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y,
    z: az * Math.pow(t, 3) + bz * Math.pow(t, 2) + cz * t + p0.z
  };
};
