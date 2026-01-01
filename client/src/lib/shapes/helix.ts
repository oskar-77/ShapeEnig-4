export const helix = (i: number, count: number) => {
  const t = i / count;
  const angle = t * Math.PI * 12; // Increased rotations for better double helix
  const radius = 25;
  const strand = i % 2 === 0 ? 0 : Math.PI;
  const x = radius * Math.cos(angle + strand);
  const z = radius * Math.sin(angle + strand);
  const y = t * 120 - 60;
  
  // Add connecting "rungs" every few particles
  if (i % 50 < 10) {
    const lerp = (i % 10) / 10;
    return {
      x: radius * Math.cos(angle) * (1 - 2 * lerp),
      y: y,
      z: radius * Math.sin(angle) * (1 - 2 * lerp)
    };
  }

  return { x, y, z };
};
