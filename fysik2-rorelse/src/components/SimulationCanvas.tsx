import React, { useRef, useEffect } from 'react';
import type { Point, Vector } from '../types';
import { SCALE_X, SCALE_Y } from '../constants';
import { ResetViewIcon } from './icons';

interface SimulationCanvasProps {
  projectile: Point;
  trajectory: Point[];
  velocity: Vector;
  showVx: boolean;
  showVy: boolean;
  showV: boolean;
  initialHeight: number;
  groundColor: string;
  groundHighlightColor: string;
  launchAngle: number;
  initialVelocity: number;
  status: 'idle' | 'running' | 'paused' | 'finished';
  showAxes: boolean;
  showSymmetryLine: boolean;
  trajectoryPeak: Point | null;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  cameraOffset: Point;
  setCameraOffset: React.Dispatch<React.SetStateAction<Point>>;
}

const GROUND_HEIGHT = 40; // in pixels
const Y_AXIS_PADDING = 40; // in pixels
const VECTOR_SCALE = 3; // pixels per m/s for vectors

const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const headlen = 8;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
};

export const SimulationCanvas: React.FC<SimulationCanvasProps> = ({
  projectile,
  trajectory,
  velocity,
  showVx,
  showVy,
  showV,
  initialHeight,
  groundColor,
  groundHighlightColor,
  launchAngle,
  initialVelocity,
  status,
  showAxes,
  showSymmetryLine,
  trajectoryPeak,
  zoom,
  setZoom,
  cameraOffset,
  setCameraOffset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panState = useRef({ isPanning: false, start: { x: 0, y: 0 } });

  const resetView = () => {
    setZoom(1);
    setCameraOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = 1.1;
      const newZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
      const clampedZoom = Math.max(0.1, Math.min(10, newZoom));

      const worldX = (mouseX - Y_AXIS_PADDING - cameraOffset.x) / (SCALE_X * zoom);
      const worldY = (canvas.height - GROUND_HEIGHT - mouseY - cameraOffset.y) / (SCALE_Y * zoom);

      setZoom(clampedZoom);

      const newOffsetX = mouseX - Y_AXIS_PADDING - worldX * SCALE_X * clampedZoom;
      const newOffsetY = canvas.height - GROUND_HEIGHT - mouseY - worldY * SCALE_Y * clampedZoom;

      setCameraOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
      panState.current = { isPanning: true, start: { x: e.clientX, y: e.clientY } };
      (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
  };
  const handleMouseUp = (e: React.MouseEvent) => {
      panState.current.isPanning = false;
      (e.currentTarget as HTMLElement).style.cursor = 'grab';
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
      panState.current.isPanning = false;
      (e.currentTarget as HTMLElement).style.cursor = 'grab';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
      if (!panState.current.isPanning) return;
      const dx = e.clientX - panState.current.start.x;
      const dy = e.clientY - panState.current.start.y;

      setCameraOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      panState.current.start = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    const toCanvasX = (x: number) => Y_AXIS_PADDING + cameraOffset.x + x * SCALE_X * zoom;
    const toCanvasY = (y: number) => height - GROUND_HEIGHT - cameraOffset.y - y * SCALE_Y * zoom;

    const groundCanvasY = toCanvasY(0);

    ctx.clearRect(0, 0, width, height);

    // Dynamic Grid and Axes
    const worldXMin = (-Y_AXIS_PADDING - cameraOffset.x) / (SCALE_X * zoom);
    const worldXMax = (width - Y_AXIS_PADDING - cameraOffset.x) / (SCALE_X * zoom);
    const worldYMin = (groundCanvasY - height) / (SCALE_Y * zoom);
    const worldYMax = (groundCanvasY) / (SCALE_Y * zoom);

    const getNiceStep = (range: number) => {
        if (range <= 0) return 1;
        const exponent = Math.floor(Math.log10(range));
        const fraction = range / Math.pow(10, exponent);
        let niceFraction;
        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;
        return Math.max(0.1, niceFraction * Math.pow(10, exponent - 1));
    };

    const xTickStep = getNiceStep(worldXMax - worldXMin);
    const yTickStep = getNiceStep(worldYMax - worldYMin);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const firstXLine = Math.floor(worldXMin / xTickStep) * xTickStep;
    for (let x = firstXLine; x < worldXMax; x += xTickStep) {
        const canvasX = toCanvasX(x);
        if (canvasX > Y_AXIS_PADDING) {
            ctx.beginPath();
            ctx.moveTo(canvasX, 0);
            ctx.lineTo(canvasX, height);
            ctx.stroke();
        }
    }
    const firstYLine = Math.floor(worldYMin / yTickStep) * yTickStep;
    for (let y = firstYLine; y < worldYMax; y += yTickStep) {
        const canvasY = toCanvasY(y);
        if (canvasY < groundCanvasY && canvasY > 0) {
            ctx.beginPath();
            ctx.moveTo(0, canvasY);
            ctx.lineTo(width, canvasY);
            ctx.stroke();
        }
    }

    ctx.fillStyle = groundColor;
    ctx.fillRect(0, groundCanvasY, width, height - groundCanvasY);
    ctx.fillStyle = groundHighlightColor;
    ctx.fillRect(0, groundCanvasY, width, 5);

    if (showAxes) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.font = '12px Inter, sans-serif';

      ctx.beginPath();
      ctx.moveTo(Y_AXIS_PADDING, groundCanvasY);
      ctx.lineTo(Y_AXIS_PADDING, 10);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      const firstYLabel = Math.max(0, Math.ceil(worldYMin / yTickStep) * yTickStep);
      for (let meter = firstYLabel; meter < worldYMax; meter += yTickStep) {
        const y_px = toCanvasY(meter);
        if (y_px < 10 || y_px > groundCanvasY) continue;
        ctx.beginPath();
        ctx.moveTo(Y_AXIS_PADDING - 5, y_px);
        ctx.lineTo(Y_AXIS_PADDING, y_px);
        ctx.stroke();
        ctx.fillText(`${Number(meter.toFixed(2)).toString()}m`, Y_AXIS_PADDING - 8, y_px);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const firstXLabel = Math.max(0, Math.ceil(worldXMin / xTickStep) * xTickStep);
      for (let meter = firstXLabel; meter < worldXMax; meter += xTickStep) {
        const x_px = toCanvasX(meter);
        if (x_px < Y_AXIS_PADDING + 15 || x_px > width - 15) continue;
        ctx.beginPath();
        ctx.moveTo(x_px, groundCanvasY);
        ctx.lineTo(x_px, groundCanvasY + 5);
        ctx.stroke();
        ctx.fillText(`${Number(meter.toFixed(2)).toString()}m`, x_px, groundCanvasY + 8);
      }
      ctx.restore();
    }

    if (status === 'idle') {
      const sx = toCanvasX(0);
      const sy = toCanvasY(initialHeight);
      const angleRad = (launchAngle * Math.PI) / 180;
      const indicatorLength = initialVelocity * VECTOR_SCALE * zoom;
      const ex = sx + indicatorLength * Math.cos(angleRad);
      const ey = sy - indicatorLength * Math.sin(angleRad);

      ctx.save();
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();
    }

    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (trajectory.length > 0) {
      ctx.moveTo(toCanvasX(trajectory[0].x), toCanvasY(trajectory[0].y));
      for (let i = 1; i < trajectory.length; i++) {
        ctx.lineTo(toCanvasX(trajectory[i].x), toCanvasY(trajectory[i].y));
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    if (showSymmetryLine && trajectoryPeak) {
        const peakX = toCanvasX(trajectoryPeak.x);
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(peakX, 10);
        ctx.lineTo(peakX, groundCanvasY);
        ctx.stroke();
        ctx.restore();
    }

    const projX = toCanvasX(projectile.x);
    const projY = toCanvasY(projectile.y);

    if (projY < height) {
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(projX, projY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.beginPath();
      ctx.arc(projX, projY, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '16px Inter, sans-serif';
      const vec_scale = VECTOR_SCALE * zoom;
      if (showV) {
        const endVx = projX + velocity.vx * vec_scale;
        const endVy = projY - velocity.vy * vec_scale;
        drawArrow(ctx, projX, projY, endVx, endVy, '#f472b6');

        ctx.fillStyle = '#f472b6';
        ctx.textAlign = velocity.vx >= 0 ? 'left' : 'right';
        ctx.textBaseline = velocity.vy >= 0 ? 'bottom' : 'top';
        const offsetX = velocity.vx >= 0 ? 8 : -8;
        const offsetY = velocity.vy >= 0 ? -8 : 8;
        ctx.fillText('v', endVx + offsetX, endVy + offsetY);
      }
      if (showVx) {
        const endX = projX + velocity.vx * vec_scale;
        drawArrow(ctx, projX, projY, endX, projY, '#facc15');
        ctx.fillStyle = '#facc15';
        ctx.textAlign = velocity.vx >= 0 ? 'left' : 'right';
        ctx.textBaseline = 'bottom';
        const offsetX = velocity.vx >= 0 ? 5 : -5;
        ctx.fillText('vₓ', endX + offsetX, projY - 5);
      }
      if (showVy) {
        const endY = projY - velocity.vy * vec_scale;
        drawArrow(ctx, projX, projY, projX, endY, '#a78bfa');
        ctx.fillStyle = '#a78bfa';
        ctx.textAlign = 'left';
        ctx.textBaseline = velocity.vy >= 0 ? 'bottom' : 'top';
        const offsetY = velocity.vy >= 0 ? -5 : 5;
        ctx.fillText('vᵧ', projX + 8, endY + offsetY);
      }
    }

    if (initialHeight > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(Y_AXIS_PADDING - 5, toCanvasY(initialHeight) - 2, 10, 4);
    }

    // Draw max height and range markers when finished
    if (status === 'finished' && trajectoryPeak) {
        // Max height marker (y_max)
        const peakX = toCanvasX(trajectoryPeak.x);
        const peakY = toCanvasY(trajectoryPeak.y);

        // Draw box for y_max
        ctx.save();
        ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
        ctx.strokeStyle = 'rgba(34, 211, 238, 1)';
        ctx.lineWidth = 2;

        const yMaxText = `y_max = ${trajectoryPeak.y.toFixed(2)} m`;
        ctx.font = 'bold 14px Inter, sans-serif';
        const yMaxWidth = ctx.measureText(yMaxText).width;

        // Box positioning
        const yBoxX = peakX + 15;
        const yBoxY = peakY - 25;
        const yBoxPadding = 8;
        const yBoxWidth = yMaxWidth + yBoxPadding * 2;
        const yBoxHeight = 24;

        // Draw rounded rectangle background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.beginPath();
        ctx.roundRect(yBoxX, yBoxY, yBoxWidth, yBoxHeight, 4);
        ctx.fill();
        ctx.strokeStyle = '#22d3ee';
        ctx.stroke();

        // Draw text
        ctx.fillStyle = '#22d3ee';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(yMaxText, yBoxX + yBoxPadding, yBoxY + yBoxHeight / 2);

        // Draw pointer line to peak
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(yBoxX, yBoxY + yBoxHeight / 2);
        ctx.stroke();

        ctx.restore();

        // Max range marker (x_max)
        const rangeX = toCanvasX(projectile.x);
        const rangeY = toCanvasY(0);

        ctx.save();
        const xMaxText = `x_max = ${projectile.x.toFixed(2)} m`;
        ctx.font = 'bold 14px Inter, sans-serif';
        const xMaxWidth = ctx.measureText(xMaxText).width;

        // Box positioning
        const xBoxX = rangeX - xMaxWidth / 2 - 8;
        const xBoxY = rangeY - 45;
        const xBoxPadding = 8;
        const xBoxWidth = xMaxWidth + xBoxPadding * 2;
        const xBoxHeight = 24;

        // Draw rounded rectangle background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.beginPath();
        ctx.roundRect(xBoxX, xBoxY, xBoxWidth, xBoxHeight, 4);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        ctx.fillStyle = '#10b981';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(xMaxText, xBoxX + xBoxPadding, xBoxY + xBoxHeight / 2);

        // Draw pointer line to landing point
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rangeX, rangeY);
        ctx.lineTo(rangeX, xBoxY + xBoxHeight);
        ctx.stroke();

        // Draw vertical dashed line at landing point
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rangeX, rangeY - 5);
        ctx.lineTo(rangeX, 10);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
    }

  }, [projectile, trajectory, velocity, showVx, showVy, showV, initialHeight, groundColor, groundHighlightColor, launchAngle, initialVelocity, status, showAxes, showSymmetryLine, trajectoryPeak, zoom, cameraOffset]);

  return (
    <div
        className="relative w-full max-w-4xl aspect-[5/3] bg-slate-900/70 rounded-lg overflow-hidden shadow-lg border border-slate-700 cursor-grab"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        className="w-full h-full"
      />
       <button
            onClick={resetView}
            className="absolute top-3 right-3 bg-slate-800/50 hover:bg-slate-700/70 text-slate-300 p-2 rounded-full transition-all duration-200 opacity-70 hover:opacity-100"
            title="Återställ vy"
        >
            <ResetViewIcon />
        </button>
    </div>
  );
};
