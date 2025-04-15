import React, { useState, useEffect } from "react";
import style from "./App.module.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import RobotModel from "./models/RobotModel";
import ArrowCanvas from "./ArrowCanvas";
import ContactWidget from "./ContactWidget";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePos, setMousePos] = useState([0, 0]);
  const [titleRotation, setTitleRotation] = useState({ x: 0, y: 0 });
  const [iconPos, setIconPos] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Track the vertical scroll position
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Get the mouse position in normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setMousePos([x, y]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <Canvas
          className={`${style.robot}`}
          style={{
            width: "100vw",
            height: "90vh",
            transform: `translate(0, ${scrollPosition / 3}px)`,
            zIndex: -1,
          }}
        >
          <ambientLight />
          <directionalLight position={[100, 100, 50]}></directionalLight>
          <RobotModel scrollPosition={scrollPosition} mousePos={mousePos} />
        </Canvas>
        <h1 className={`${style["main-title"]}`}>Botcats</h1>
        <a href="#who-are-we">
          <img
            src="./down_arrow.png"
            alt=""
            className={`${style["down-arrow"]}`}
          />
        </a>
      </div>
      <div className={`${style["who-are-we"]}`} id="who-are-we">
        <h3 className={`${style["who-are-we-title"]}`}>Who are we?</h3>
        <div className={`${style["who-are-we-text-container"]}`}>
          <p className={`${style["who-are-we-text"]}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            mollis metus sed purus ultricies placerat. Sed gravida a est quis
            sodales. Nulla eget lectus at nulla hendrerit luctus id laoreet sem.
            Etiam varius quam vel nibh laoreet ultricies.
          </p>
        </div>
        <img
          src="./teamphoto.png"
          className={`${style["who-are-we-photo"]}`}
        ></img>
      </div>
      <div className={`${style["inspire-container"]}`}>
        <ArrowCanvas></ArrowCanvas>
        <h2 className={`${style["inspire-title"]}`}>Inspire</h2>
      </div>
      <ContactWidget></ContactWidget>
    </>
  );
}

export default App;
