export const cylinder = (i: number, count: number) => {
  const h = (i / count) * 100 - 50;
  const r = 35;
  const angle = (i % 200) / 200 * Math.PI * 2;
  return {
    x: r * Math.cos(angle),
    y: h,
    z: r * Math.sin(angle)
  };
};
