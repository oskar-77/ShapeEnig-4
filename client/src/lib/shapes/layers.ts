export const layers = (i: number, count: number) => {
  const numLayers = 5;
  const pPerLayer = Math.floor(count / numLayers);
  const layerIdx = Math.floor(i / pPerLayer);
  const y = (layerIdx - numLayers / 2) * 25;
  const size = 60;
  return {
    x: (Math.random() - 0.5) * size,
    y: y,
    z: (Math.random() - 0.5) * size
  };
};
