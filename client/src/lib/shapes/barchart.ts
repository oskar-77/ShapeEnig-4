export const barchart = (i: number, count: number) => {
  const numBars = 8;
  const pPerBar = Math.floor(count / numBars);
  const barIdx = Math.floor(i / pPerBar);
  const x = (barIdx - (numBars - 1) / 2) * 18;
  
  // Create a solid box for each bar
  const particlesInBar = i % pPerBar;
  const barHeight = 20 + (barIdx + 1) * 12;
  
  // Distribute particles in a rectangular volume for the bar
  const depth = 8;
  const width = 8;
  
  return {
    x: x + (Math.random() - 0.5) * width,
    y: (Math.random() * barHeight) - 50,
    z: (Math.random() - 0.5) * depth
  };
};
