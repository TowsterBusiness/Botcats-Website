import { useFrame } from "@react-three/fiber";
import React, { useState, useEffect } from "react";
import style from "./App.module.css";

let iconSelectIndex = 0;

function ContactWidget() {
  let arrowCanvasRef: React.RefObject<HTMLCanvasElement> =
    React.createRef<HTMLCanvasElement>();
  const [iconPos, setIconPos] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

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

      const title = document.getElementById("contact-title");

      if (title == null) return;

      let { left, top, width, height } = title.getBoundingClientRect();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const iconNum = 3;
      const angleRange = (90 / 180) * Math.PI;
      const angleDistance = (angleRange * 2) / (iconNum - 1);
      const iconDistance = 40;
      const velMag = 100;
      const startDistance = 50;
      const timeDelay = 300;

      for (let bezierIndex = 0; bezierIndex < iconPos.length; bezierIndex++) {
        let approachAngle = -angleRange + angleDistance * bezierIndex;
        let bezierCp = [
          [
            canvas.width / 2 +
              startDistance * bezierIndex -
              (startDistance * (iconPos.length - 1)) / 2,
            height,
          ],
          [
            iconPos[bezierIndex].x +
              50 -
              Math.sin(approachAngle) * iconDistance,
            iconPos[bezierIndex].y +
              50 -
              Math.cos(approachAngle) * iconDistance,
          ],
        ];

        let bezierCv = [
          [0, 100],
          [Math.sin(approachAngle) * velMag, Math.cos(approachAngle) * velMag],
        ];

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
        const timeNow =
          (Date.now() + timeDelay * bezierIndex) %
          (timeBetween * (bezierCp.length - 1));
        const intervalTime = Math.floor(timeNow / timeBetween);
        const intervalT = (timeNow % timeBetween) / timeBetween;

        let xPos = bezierPos(
          bezierCp[intervalTime][0],
          bezierCp[intervalTime + 1][0],
          bezierCv[intervalTime][0],
          bezierCv[intervalTime + 1][0],
          intervalT
        );

        let yPos = bezierPos(
          bezierCp[intervalTime][1],
          bezierCp[intervalTime + 1][1],
          bezierCv[intervalTime][1],
          bezierCv[intervalTime + 1][1],
          intervalT
        );

        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(255, 255, 255, ${intervalT})`;
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(xPos, yPos, 10 * intervalT, 0, 2 * Math.PI);
        ctx.fill();

        if (iconSelectIndex != -1) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${
            1 - ((Date.now() / 5) % 200) / 200
          }`;
          ctx.lineWidth = 2;
          let rippleWidth = (Date.now() / 5) % 200;
          ctx.beginPath();
          ctx.roundRect(
            iconPos[iconSelectIndex].x - rippleWidth / 2 + 50,
            iconPos[iconSelectIndex].y - rippleWidth / 2 + 50,
            rippleWidth,
            rippleWidth,
            30
          );
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      const contactRect = document
        .getElementById("contact-container")
        ?.getBoundingClientRect();

      if (contactRect == null) return;

      let { left, top, width, height } = contactRect;

      // Get the card's position and dimensions
      const title = document
        .getElementById("contact-title")
        ?.getBoundingClientRect();

      if (title == null) return;

      let mouseX = event.clientX - left;
      let mouseY = event.clientY - top;

      const iconNum = 3;
      const angleRange = (60 / 180) * Math.PI;
      const angleDistance = (angleRange * 2) / (iconNum - 1);
      const iconDistance = 300;
      iconSelectIndex = -1;
      for (let iconIndex = 0; iconIndex < iconNum; iconIndex++) {
        const icon = document.getElementById("icon" + (iconIndex + 1));

        if (icon != null) {
          let tempIconPos = iconPos;
          let newIconPos = {
            x:
              width / 2 +
              Math.sin(-angleRange + angleDistance * iconIndex) * iconDistance,
            y:
              (Math.cos(-angleRange + angleDistance * iconIndex) *
                iconDistance) /
                1.5 +
              title.height,
          };
          let distance =
            Math.pow(newIconPos.x - mouseX, 2) +
            Math.pow(newIconPos.y - mouseY, 2);

          if (distance < 5000) {
            iconSelectIndex = iconIndex;
          }
          let magPerc = sigmoid(-distance / 2000 + 2.5);
          newIconPos.x += (mouseX - newIconPos.x) * magPerc - 50;
          newIconPos.y += (mouseY - newIconPos.y) * magPerc - 50;
          tempIconPos[iconIndex] = newIconPos;
          setIconPos(tempIconPos);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={`${style["contact-container"]}`} id="contact-container">
        <h2 className={`${style["contact-title"]}`} id="contact-title">
          Reach Us!
        </h2>
        <canvas
          style={{ position: "absolute" }}
          ref={arrowCanvasRef}
          onMouseMove={(evt: any) => {
            const canvas = arrowCanvasRef.current;
            if (canvas == null) return;
          }}
        ></canvas>
        <img
          src="./icons/email.jpg"
          alt=""
          id="icon1"
          className={`${style["contact-icons"]}`}
          style={{ left: `${iconPos[0].x}px`, top: `${iconPos[0].y}px` }}
        />
        <img
          src="./icons/instagram.png"
          alt=""
          id="icon2"
          className={`${style["contact-icons"]}`}
          style={{ left: `${iconPos[1].x}px`, top: `${iconPos[1].y}px` }}
        />
        <img
          src="./icons/youtube.jpg"
          alt=""
          id="icon3"
          className={`${style["contact-icons"]}`}
          style={{ left: `${iconPos[2].x}px`, top: `${iconPos[2].y}px` }}
        />
      </div>
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

function sigmoid(t: number) {
  return 1 / (1 + Math.pow(Math.E, -t));
}

export default ContactWidget;
