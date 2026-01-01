export const galaxy = (i: number, count: number) => {
  const t = i / count;
  const angle = t * Math.PI * 20;
  const radius = 50 * Math.pow(t, 0.5);
  const arm = (i % 3) * (Math.PI * 2 / 3);
  return {
    x: radius * Math.cos(angle + arm) + (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 10 * (1 - t),
    z: radius * Math.sin(angle + arm) + (Math.random() - 0.5) * 5
  };
};
