export const mobius = (i: number, count: number) => {
  const u = (i / count) * Math.PI * 2;
  const v = (Math.random() - 0.5) * 20;
  const a = 40;
  return {
    x: (a + v * Math.cos(u / 2)) * Math.cos(u),
    y: (a + v * Math.cos(u / 2)) * Math.sin(u),
    z: v * Math.sin(u / 2)
  };
};
