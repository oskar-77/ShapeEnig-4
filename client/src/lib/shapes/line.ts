export const line = (i: number, count: number) => {
  const length = 120;
  return {
    x: (i / count - 0.5) * length,
    y: (Math.random() - 0.5) * 3,
    z: (Math.random() - 0.5) * 3
  };
};
