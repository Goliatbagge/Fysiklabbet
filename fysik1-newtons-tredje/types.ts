export interface Vector2D {
  x: number;
  y: number;
}

// Base interface for any object with physics
export interface PhysicalObject {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;
  mass: number;
  radius: number; // For simple circular collision detection
}

export interface AstronautState extends PhysicalObject {}

export interface SatelliteState extends PhysicalObject {}

export interface ParticleState {
  id: number;
  position: Vector2D;
  velocity: Vector2D;
  size: number;
  opacity: number;
  life: number;
}
