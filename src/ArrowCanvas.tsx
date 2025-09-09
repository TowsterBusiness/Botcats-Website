import { useFrame } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import style from "./App.module.css";

const bezierCpPer = [
  [0.42, 0.15],
  [0.9, 0.3],
  [0.2, 0.7],
  [0.7, 0.8],
];

const bezierCv = [
  [700, 0],
  [0, 1000],
  [0, 600],
  [600, 0],
];

let isMouseDown = false;
let velSelect = false;
let selectIndex = 0;

let isDragged = true;

function ArrowCanvas() {
  let arrowCanvasRef: React.RefObject<HTMLCanvasElement> =
    React.createRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = arrowCanvasRef.current;

    const animate = () => {
      if (canvas == null) return;

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext("2d");

      if (ctx == null) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let bezierCp = [];
      for (let i = 0; i < bezierCpPer.length; i++) {
        bezierCp.push([
          bezierCpPer[i][0] * canvas.width,
          bezierCpPer[i][1] * canvas.height,
        ]);
      }

      ctx.lineWidth = 5;
      ctx.strokeStyle = "gray";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.moveTo(bezierCp[0][0], bezierCp[0][1]);
      for (let i = 0; i < bezierCp.length - 1; i++) {
        ctx.bezierCurveTo(
          bezierCp[i][0] + bezierCv[i][0] / 3,
          bezierCp[i][1] + bezierCv[i][1] / 3,
          bezierCp[i + 1][0] - bezierCv[i + 1][0] / 3,
          bezierCp[i + 1][1] - bezierCv[i + 1][1] / 3,
          bezierCp[i + 1][0],
          bezierCp[i + 1][1]
        );
      }
      ctx.stroke();

      const timeBetween = 1500;
      const timeNow = Date.now() % (timeBetween * (bezierCp.length - 1));
      const intervalTime = Math.floor(timeNow / timeBetween);

      let xPos = bezierPos(
        bezierCp[intervalTime][0],
        bezierCp[intervalTime + 1][0],
        bezierCv[intervalTime][0],
        bezierCv[intervalTime + 1][0],
        (timeNow % timeBetween) / timeBetween
      );

      let yPos = bezierPos(
        bezierCp[intervalTime][1],
        bezierCp[intervalTime + 1][1],
        bezierCv[intervalTime][1],
        bezierCv[intervalTime + 1][1],
        (timeNow % timeBetween) / timeBetween
      );

      let xVel = bezierVel(
        bezierCp[intervalTime][0],
        bezierCp[intervalTime + 1][0],
        bezierCv[intervalTime][0],
        bezierCv[intervalTime + 1][0],
        (timeNow % timeBetween) / timeBetween
      );

      let yVel = bezierVel(
        bezierCp[intervalTime][1],
        bezierCp[intervalTime + 1][1],
        bezierCv[intervalTime][1],
        bezierCv[intervalTime + 1][1],
        (timeNow % timeBetween) / timeBetween
      );

      let xAccel = bezierAccel(
        bezierCp[intervalTime][0],
        bezierCp[intervalTime + 1][0],
        bezierCv[intervalTime][0],
        bezierCv[intervalTime + 1][0],
        (timeNow % timeBetween) / timeBetween
      );

      let yAccel = bezierAccel(
        bezierCp[intervalTime][1],
        bezierCp[intervalTime + 1][1],
        bezierCv[intervalTime][1],
        bezierCv[intervalTime + 1][1],
        (timeNow % timeBetween) / timeBetween
      );

      ctx.setLineDash([]);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ff8a42";
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos + xVel / 5, yPos + yVel / 5);
      ctx.stroke();

      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos + xAccel / 20, yPos + yAccel / 20);
      ctx.stroke();

      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(xPos, yPos, 30, 0, 2 * Math.PI);
      ctx.stroke();

      for (let i = 0; i < bezierCp.length; i++) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(bezierCp[i][0], bezierCp[i][1], 10, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = "#ff8a42";
        ctx.beginPath();
        ctx.moveTo(bezierCp[i][0], bezierCp[i][1]);
        ctx.lineTo(
          bezierCp[i][0] + bezierCv[i][0] / 5,
          bezierCp[i][1] + bezierCv[i][1] / 5
        );
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <canvas
        style={{ position: "absolute" }}
        ref={arrowCanvasRef}
        onMouseDown={(evt: any) => {
          const canvas = arrowCanvasRef.current;
          if (canvas == null) return;
          const x = evt.nativeEvent.offsetX;
          const y = evt.nativeEvent.offsetY;
          for (let i = 0; i < bezierCpPer.length; i++) {
            if (
              Math.pow(bezierCpPer[i][0] * canvas.width - x, 2) +
                Math.pow(bezierCpPer[i][1] * canvas.height - y, 2) <=
              130
            ) {
              isMouseDown = true;
              velSelect = false;
              selectIndex = i;
              return;
            }
          }

          for (let i = 0; i < bezierCv.length; i++) {
            if (
              Math.pow(
                bezierCpPer[i][0] * canvas.width + bezierCv[i][0] / 5 - x,
                2
              ) +
                Math.pow(
                  bezierCpPer[i][1] * canvas.height + bezierCv[i][1] / 5 - y,
                  2
                ) <=
              130
            ) {
              isMouseDown = true;
              velSelect = true;
              selectIndex = i;
              return;
            }
          }
        }}
        onMouseUp={() => {
          isMouseDown = false;
        }}
        onMouseMove={(evt: any) => {
          const canvas = arrowCanvasRef.current;
          if (canvas == null) return;
          if (isMouseDown) {
            const x = evt.nativeEvent.offsetX;
            const y = evt.nativeEvent.offsetY;
            isDragged = false;
            if (velSelect) {
              bezierCv[selectIndex] = [
                (x - bezierCpPer[selectIndex][0] * canvas.width) * 5,
                (y - bezierCpPer[selectIndex][1] * canvas.height) * 5,
              ];
            } else {
              bezierCpPer[selectIndex] = [x / canvas.width, y / canvas.height];
            }
          }
        }}
      ></canvas>
      {isDragged ? (
        <p className={`${style["inspire-drag"]}`}>Drag The Dots!</p>
      ) : (
        <></>
      )}
    </>
  );
}

function bezierPos(
  pos1: number,
  pos2: number,
  vel1: number,
  vel2: number,
  t: number
) {
  let t2: number = t * t;
  let t3: number = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * pos1 +
    (t3 - 2 * t2 + t) * vel1 +
    (-2 * t3 + 3 * t2) * pos2 +
    (t3 - t2) * vel2
  );
}

function bezierVel(
  pos1: number,
  pos2: number,
  vel1: number,
  vel2: number,
  t: number
) {
  let t2: number = t * t;
  return (
    pos1 * (6 * t2 - 6 * t) +
    vel1 * (3 * t2 - 4 * t + 1) +
    vel2 * (3 * t2 - 2 * t) +
    pos2 * (6 * t - 6 * t2)
  );
}

function bezierAccel(
  pos1: number,
  pos2: number,
  vel1: number,
  vel2: number,
  t: number
) {
  return (
    (12 * t - 6) * pos1 +
    (6 * t - 4) * vel1 +
    (6 * t - 2) * vel2 +
    (6 - 12 * t) * pos2
  );
}

export default ArrowCanvas;
