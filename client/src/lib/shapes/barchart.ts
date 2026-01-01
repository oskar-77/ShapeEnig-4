export const barchart = (i: number, count: number) => {
  const numBars = 10;
  const pPerBar = Math.floor(count / numBars);
  const barIdx = Math.floor(i / pPerBar);
  const barHeight = 20 + Math.sin(barIdx) * 40 + 40;
  const x = (barIdx - numBars / 2) * 15;
  return {
    x: x + (Math.random() - 0.5) * 8,
    y: (Math.random() * barHeight) - 50,
    z: (Math.random() - 0.5) * 8
  };
};
