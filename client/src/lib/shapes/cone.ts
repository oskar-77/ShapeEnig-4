export const cone = (i: number, count: number) => {
  const t = Math.random();
  const angle = Math.random() * Math.PI * 2;
  const radius = (1 - t) * 40;
  return {
    x: radius * Math.cos(angle),
    y: t * 100 - 50,
    z: radius * Math.sin(angle)
  };
};
