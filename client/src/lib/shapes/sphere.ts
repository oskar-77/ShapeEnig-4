export const sphere = (i: number, count: number) => {
  const phi = Math.acos(-1 + (2 * i) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  const r = 45;
  return {
    x: r * Math.cos(theta) * Math.sin(phi),
    y: r * Math.sin(theta) * Math.sin(phi),
    z: r * Math.cos(phi)
  };
};
