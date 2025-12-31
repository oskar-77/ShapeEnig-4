export const helix = (i: number, count: number) => {
  const angle = 0.15 * i;
  const radius = 25;
  const strand = i % 2 === 0 ? 0 : Math.PI;
  return {
    x: radius * Math.cos(angle + strand),
    y: (i / count) * 120 - 60,
    z: radius * Math.sin(angle + strand)
  };
};
