export interface SimulationState {
  currentDirection: 1 | -1; // 1 for Up, -1 for Down
  showFieldLines: boolean;
  showFieldDirection: boolean;
  showLabels: boolean;
}

export interface ControlProps extends SimulationState {
  toggleDirection: () => void;
  toggleFieldLines: () => void;
  toggleFieldDirection: () => void;
  toggleLabels: () => void;
}
