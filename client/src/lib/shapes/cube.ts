export const cube = (i: number, count: number) => {
  const side = Math.floor(Math.pow(count, 1/3));
  const size = 65;
  return {
    x: (i % side - side/2) * (size/side),
    y: (Math.floor(i/side) % side - side/2) * (size/side),
    z: (Math.floor(i/(side*side)) - side/2) * (size/side)
  };
};
