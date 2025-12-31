export const pyramid = (i: number, count: number) => {
  const layers = 60;
  const pPerLayer = Math.floor(count / layers);
  const layer = Math.floor(i / pPerLayer);
  const progress = layer / layers;
  const height = 80;
  const baseSize = 70;
  const side = (1 - progress) * baseSize;
  return {
    x: (Math.random() - 0.5) * side,
    y: progress * height - height/2,
    z: (Math.random() - 0.5) * side
  };
};
