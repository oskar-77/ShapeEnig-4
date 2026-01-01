export const vortex = (i: number, count: number) => {
  const t = i / count;
  const angle = t * Math.PI * 30;
  const radius = t * 50;
  return {
    x: radius * Math.cos(angle),
    y: t * 100 - 50,
    z: radius * Math.sin(angle)
  };
};
