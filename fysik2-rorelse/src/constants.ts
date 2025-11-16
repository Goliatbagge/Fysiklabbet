export const DEFAULT_GRAVITY = 9.82; // m/s^2 on Earth
export const TIME_STEP = 1 / 60; // 60 updates per second
export const DRAG_COEFFICIENT = 0.01; // For air resistance
export const SCALE_X = 6; // Pixels per meter
export const SCALE_Y = 15; // Pixels per meter

export const CELESTIAL_BODIES = [
    { name: 'Solen', gravity: 274.0, gradient: 'linear-gradient(45deg, #fef08a, #f97316)', groundColor: '#f97316', groundHighlightColor: '#fcd34d' },
    { name: 'Merkurius', gravity: 3.7, gradient: 'linear-gradient(45deg, #a8a29e, #78716c)', groundColor: '#78716c', groundHighlightColor: '#a8a29e' },
    { name: 'Venus', gravity: 8.87, gradient: 'linear-gradient(45deg, #fde68a, #eab308)', groundColor: '#eab308', groundHighlightColor: '#fde68a' },
    { name: 'Jorden', gravity: 9.82, gradient: 'linear-gradient(45deg, #22c55e, #3b82f6)', groundColor: '#16a34a', groundHighlightColor: '#22c55e' },
    { name: 'Månen', gravity: 1.62, gradient: 'linear-gradient(45deg, #f8fafc, #a1a1aa)', groundColor: '#a1a1aa', groundHighlightColor: '#e2e8f0' },
    { name: 'Mars', gravity: 3.72, gradient: 'linear-gradient(45deg, #f87171, #b91c1c)', groundColor: '#b91c1c', groundHighlightColor: '#f87171' },
    { name: 'Jupiter', gravity: 24.79, gradient: 'linear-gradient(45deg, #fcd34d, #a16207)', groundColor: '#a16207', groundHighlightColor: '#fcd34d' },
    { name: 'Saturnus', gravity: 10.44, gradient: 'linear-gradient(45deg, #fde68a, #ca8a04)', groundColor: '#ca8a04', groundHighlightColor: '#fde68a' },
    { name: 'Uranus', gravity: 8.69, gradient: 'linear-gradient(45deg, #7dd3fc, #0ea5e9)', groundColor: '#0ea5e9', groundHighlightColor: '#7dd3fc' },
    { name: 'Neptunus', gravity: 11.15, gradient: 'linear-gradient(45deg, #38bdf8, #2563eb)', groundColor: '#2563eb', groundHighlightColor: '#38bdf8' },
];
