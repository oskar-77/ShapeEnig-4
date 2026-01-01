export const rings = (i: number, count: number) => {
  const numRings = 5;
  const pPerRing = Math.floor(count / numRings);
  const ringIdx = Math.floor(i / pPerRing);
  const radius = 20 + ringIdx * 15;
  const angle = (i % pPerRing) / pPerRing * Math.PI * 2;
  return {
    x: radius * Math.cos(angle),
    y: (Math.random() - 0.5) * 2,
    z: radius * Math.sin(angle)
  };
};
