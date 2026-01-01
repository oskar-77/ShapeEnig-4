export const fountain = (i: number, count: number) => {
  const t = (i / count);
  const angle = t * Math.PI * 2 * 20;
  const height = Math.pow(Math.random(), 2) * 100;
  const radius = height * 0.4;
  return {
    x: radius * Math.cos(angle),
    y: height - 50,
    z: radius * Math.sin(angle)
  };
};
