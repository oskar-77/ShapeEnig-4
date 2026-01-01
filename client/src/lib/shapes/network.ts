export const network = (i: number, count: number) => {
  const numNodes = 20;
  const pPerNode = Math.floor(count / numNodes);
  const nodeIdx = Math.floor(i / pPerNode);
  const angle = (nodeIdx / numNodes) * Math.PI * 2;
  const r = 50;
  const centerX = r * Math.cos(angle);
  const centerY = r * Math.sin(angle);
  const centerZ = (Math.random() - 0.5) * 20;
  
  return {
    x: centerX + (Math.random() - 0.5) * 10,
    y: centerY + (Math.random() - 0.5) * 10,
    z: centerZ + (Math.random() - 0.5) * 10
  };
};
