export const torus = (i: number, count: number) => {
  const R = 40;
  const r = 15;
  const u = (i / count) * Math.PI * 2;
  const v = (i % 100) * (Math.PI * 2 / 100);
  return {
    x: (R + r * Math.cos(v)) * Math.cos(u),
    y: (R + r * Math.cos(v)) * Math.sin(u),
    z: r * Math.sin(v)
  };
};
