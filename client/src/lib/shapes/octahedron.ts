export const octahedron = (i: number, count: number) => {
  const side = 50;
  const section = i % 8;
  const signX = section & 1 ? 1 : -1;
  const signY = section & 2 ? 1 : -1;
  const signZ = section & 4 ? 1 : -1;
  const a = Math.random();
  const b = Math.random() * (1 - a);
  const c = 1 - a - b;
  return {
    x: signX * a * side,
    y: signY * b * side,
    z: signZ * c * side
  };
};
