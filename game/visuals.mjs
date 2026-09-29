// Foot-contact lines on the walkable surface, in the 1280 x 720 arena.
// Non-meadow backgrounds are drawn with the existing 15px vertical offset.
export const GROUND_Y = {padang:535, perbukitan:529, lembah_goliat:515};

// Advance through a gait by distance travelled, preserving phase across stops.
// Attack animation timing is independent of this locomotion clock.
export function locomotionTime(name, distance, row) {
  const strideLength = name === 'goliat' ? 120 : 145;
  return distance / strideLength * row.frames / row.fps;
}

// Match body size, not the full silhouette (which includes a raised spear).
// Goliath's upright body in swing is ~254px versus ~310px in idle.
// Apply one fixed factor to the whole action so crouches remain natural.
export function bodyScale(name, state) {
  return name === 'goliat' && state === 'swing' ? 1.22 : 1;
}
