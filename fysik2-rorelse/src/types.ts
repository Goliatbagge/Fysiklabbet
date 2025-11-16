export interface SimulationParams {
  angle: number;
  initialVelocity: number;
  initialHeight: number;
  showVx: boolean;
  showVy: boolean;
  showV: boolean;
  airResistance: boolean;
  gravity: number;
  showAxes: boolean;
  showSymmetryLine: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  vx: number;
  vy: number;
}

export interface SimulationResults {
  maxHeight: number;
  flightTime: number;
  range: number;
}
