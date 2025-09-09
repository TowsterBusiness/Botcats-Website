import React, { useRef, useEffect } from "react";

interface GridCanvasProps {
  cellSize: number;
  gridColor?: string;
}

const GridCanvas: React.FC<GridCanvasProps> = ({
  cellSize,
  gridColor = "#525252",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the grid
        ctx.strokeStyle = gridColor;
        for (let i = 0; i * cellSize <= canvas.height; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * cellSize - 5);
          ctx.lineTo(canvas.width, i * cellSize - 5);
          ctx.stroke();
        }
        for (let j = 0; j * cellSize <= canvas.width; j++) {
          ctx.beginPath();
          ctx.moveTo(j * cellSize - 5, 0);
          ctx.lineTo(j * cellSize - 5, canvas.width);
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    drawGrid();
  }, [cellSize, gridColor]);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
      }}
      ref={canvasRef}
    />
  );
};

export default GridCanvas;
