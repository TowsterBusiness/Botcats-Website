import React, { useState, useEffect } from "react";
import style from "./App.module.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import RobotModel from "./models/RobotModel";
import ArrowCanvas from "./ArrowCanvas";
import ContactWidget from "./ContactWidget";
import GridCanvas from "./GridCanvas";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePos, setMousePos] = useState([0, 0]);

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
        <GridCanvas cellSize={100}></GridCanvas>
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
        <h1 className={`${style["main-title"]}`}>BOTCATS</h1>
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
        <img style={{
            width: "150%",
            bottom: "0",
            transform: "translate(0, -100%)",
            right: "5%"
          }} className={`${style["inspire-math"]}`} src="./hermitespline.svg"> 
        </img>
        <ArrowCanvas></ArrowCanvas>
        <h2 className={`${style["inspire-title"]}`}>Inspire</h2>
        <img style={{
          width: "40%",
          left: "10%",
          bottom: "10%",
          animationDelay: `2000ms`
        }} src="./inspire/sideplate1.png" className={`${style["inspire-images"]}`}></img>
        <img style={{
          width: "20%",
          top: "15%",
          right: "10%",
          animationDelay: `0ms`
        }} src="./inspire/Autoclawspecimen.png" className={`${style["inspire-images"]}`}></img>
        <img style={{
          width: "25%",
          top: "30%",
          left: "40%",
          animationDelay: `5000ms`
        }} src="./inspire/slides.png" className={`${style["inspire-images"]}`}></img>
        <p style={{
          width: "30%",
          top: "25%",
          left: "5%"
        }} className={`${style["inspire-text"]}`}> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        mollis metus sed purus ultricies placerat. Sed gravida a est quis
        sodales.
        </p>
        <p style={{
          width: "30%",
          bottom: "25%",
          right: "5%",
          textAlign: "right"
        }} className={`${style["inspire-text"]}`}> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        mollis metus sed purus ultricies placerat. Sed gravida a est quis
        sodales.
        </p>
        
        
      </div>
      <ContactWidget></ContactWidget>
      <div className={`${style["sponsors-container"]}`}>
        <h1 className={`${style["sponsors-title"]}`}>Our Sponsors:</h1>
        <img
          src="./sponsors.png"
          className={`${style["sponsors-image"]}`}
        ></img>
      </div>
    </>
  );
}

export default App;
