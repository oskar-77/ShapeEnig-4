export const barchart = (i: number, count: number) => {
  const numBars = 10;
  const pPerBar = Math.floor(count / numBars);
  const barIdx = Math.floor(i / pPerBar);
  
  // Grid layout for bars
  const gridX = (barIdx % 5) - 2;
  const gridZ = Math.floor(barIdx / 5) - 0.5;
  
  const x = gridX * 25;
  const z = gridZ * 25;
  
  // Height based on index
  const heights = [30, 45, 25, 60, 35, 50, 20, 55, 40, 30];
  const barHeight = heights[barIdx % heights.length];
  
  // Distribution within the bar volume
  const particlesInBar = i % pPerBar;
  
  // Calculate relative position within the bar
  const u = Math.random();
  const v = Math.random();
  const w = Math.random();
  
  const barWidth = 12;
  const barDepth = 12;
  
  return {
    x: x + (u - 0.5) * barWidth,
    y: (w * barHeight) - 40,
    z: z + (v - 0.5) * barDepth
  };
};
