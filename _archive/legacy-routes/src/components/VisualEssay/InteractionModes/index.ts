/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — INTERACTION MODES
 * ===================================================
 * 
 * Export all interaction mode components.
 * 
 * Available Modes:
 * - Mode A: IngredientOracle — Items whisper history on tap
 * - Mode B: MigrationTrail — Animated route paths on minimalist map
 * - Mode C: FlavorWheel — Rotatable dial for exploring flavors
 * - Mode D: TimefoldSlider — Drag to travel through time
 * - Mode E: WhisperingObject — Object reveals memories on hover
 */

// Mode A: Ingredient Oracle
export { 
  IngredientOracle, 
  type OracleItem 
} from './IngredientOracle';

// Mode B: Migration Trail
export { 
  MigrationTrail, 
  type Route, 
  type MapConfig 
} from './MigrationTrail';

// Mode C: Flavor Resonance Wheel
export { 
  FlavorWheel, 
  type FlavorSegment 
} from './FlavorWheel';

// Mode D: Timefold Slider
export { 
  TimefoldSlider, 
  type Era 
} from './TimefoldSlider';

// Mode E: Whispering Object
export { 
  WhisperingObject, 
  type WhisperingObjectConfig 
} from './WhisperingObject';

// Default export with all modes
export default {
  IngredientOracle: require('./IngredientOracle').default,
  MigrationTrail: require('./MigrationTrail').default,
  FlavorWheel: require('./FlavorWheel').default,
  TimefoldSlider: require('./TimefoldSlider').default,
  WhisperingObject: require('./WhisperingObject').default,
};




































