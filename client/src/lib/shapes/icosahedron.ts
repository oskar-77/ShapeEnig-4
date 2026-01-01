export const icosahedron = (i: number, count: number) => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
  ];
  const scale = 30;
  const v = vertices[i % vertices.length];
  return {
    x: v[0] * scale + (Math.random() - 0.5) * 5,
    y: v[1] * scale + (Math.random() - 0.5) * 5,
    z: v[2] * scale + (Math.random() - 0.5) * 5
  };
};
