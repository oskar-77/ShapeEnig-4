export const wave = (i: number, count: number) => {
  const rows = 140;
  const cols = Math.floor(count / rows);
  const r = Math.floor(i / cols);
  const c = i % cols;
  
  const x = (c / cols - 0.5) * 150;
  const z = (r / rows - 0.5) * 150;
  
  // Create a more interesting interference pattern wave
  const wave1 = Math.sin(x * 0.1 + z * 0.05);
  const wave2 = Math.cos(x * 0.05 - z * 0.1);
  const y = (wave1 + wave2) * 10;
  
  return { x, y, z };
};
