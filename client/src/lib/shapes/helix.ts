export const helix = (i: number, count: number) => {
  const t = i / count;
  const angle = t * Math.PI * 8;
  const radius = 25;
  const strand = i % 2 === 0 ? 0 : Math.PI;
  return {
    x: radius * Math.cos(angle + strand),
    y: t * 120 - 60,
    z: radius * Math.sin(angle + strand)
  };
};
