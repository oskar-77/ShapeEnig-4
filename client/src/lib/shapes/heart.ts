export const heart = (i: number, count: number) => {
  const t = (i / count) * Math.PI * 2;
  const scale = 3.5;
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  const depth = (Math.random() - 0.5) * 20 * Math.sin(t);
  return {
    x: x * scale,
    y: y * scale,
    z: depth
  };
};
