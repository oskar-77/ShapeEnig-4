export const nebula = (i: number, count: number) => {
  const r = 60 * Math.pow(Math.random(), 0.5);
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI;
  return {
    x: r * Math.sin(phi) * Math.cos(theta) * (0.5 + Math.random()),
    y: r * Math.sin(phi) * Math.sin(theta) * (0.5 + Math.random()),
    z: r * Math.cos(phi) * (0.2 + Math.random() * 0.5)
  };
};
