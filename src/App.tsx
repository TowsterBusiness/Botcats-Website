import React, { useState, useEffect } from "react";
import style from "./App.module.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import RobotModel from "./models/RobotModel";
import ArrowCanvas from "./ArrowCanvas";
import ContactWidget from "./ContactWidget";
import GridCanvas from "./GridCanvas";
import { floorPowerOfTwo } from "three/src/math/MathUtils";

let titleTextStore = "__TEAM_";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePos, setMousePos] = useState([0, 0]);
  const [titleText, setTitleText] = useState([
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
  ]);
  const [titleTextColors, setTitleTextColors] = useState([
    "#b8b8b855",
    "#b8b8b855",
    "#b8b8b855",
    "#b8b8b855",
    "#b8b8b855",
    "#b8b8b855",
    "#b8b8b855",
  ]);

  let firstA = true;

  useEffect(() => {
    function getRandomChar() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh";
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function setCharAt(str: string, index: number, char: string) {
      return str.substring(0, index) + char + str.substring(index + 1);
    }

    function updateTitle() {
      let targetText = "BOTCATS";

      for (let i = 0; i < titleText.length; i++) {
        if (i == 4 && firstA) {
          titleTextStore = setCharAt(titleTextStore, i, getRandomChar());
          firstA = false;
        }
        if (titleTextStore[i] != targetText[i]) {
          titleTextStore = setCharAt(titleTextStore, i, getRandomChar());
          break;
        } else {
          titleTextColors[i] = "#ffffffde";
        }
      }

      setTitleTextColors(titleTextColors);
      setTitleText(titleTextStore.split(""));

      setTimeout(updateTitle, 50);
    }

    updateTitle();

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
        <h1 className={`${style["main-title"]}`}>
          {titleText.map((c, i) => {
            return (
              <span key={i} style={{ color: titleTextColors[i] }}>
                {c}
              </span>
            );
          })}
        </h1>
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
        <div className={`${style["who-are-we-main-container"]}`}>
          <div className={`${style["who-are-we-text-container"]}`}>
            <p className={`${style["who-are-we-text"]}`}>
              <span className={`${style["bold"]}`}>Botcats</span> is a FTC
              Robotics team based in San Diego. Botcats hopes to{" "}
              <span className={`${style["bold"]}`}>
                inspire and educate all future engineers
              </span>{" "}
              to develop their interests and be inspired to take on any future
              dreams by spreading inspiration and the core values of{" "}
              <span className={`${style["bold"]}`}>FIRST</span> to our
              community. We hope to provide the tools, resources, and
              opportunities necessary for students to grow and succeed in a
              world where technology is integral to everyday society. As we
              expand as a team, we have a truly{" "}
              <span className={`${style["bold"]}`}>
                unparalleled opportunity
              </span>{" "}
              to prepare students for the next stages of their life.
            </p>
          </div>
          <img
            src="./teamphoto.png"
            className={`${style["who-are-we-photo"]}`}
          ></img>
        </div>
      </div>
      <div className={`${style["inspire-container"]}`}>
        <img
          style={{
            width: "150%",
            bottom: "0",
            transform: "translate(0, -100%)",
            right: "5%",
          }}
          className={`${style["inspire-math"]}`}
          src="./hermitespline.svg"
        ></img>
        <ArrowCanvas></ArrowCanvas>
        <h2 className={`${style["inspire-title"]}`}>Inspire</h2>
        <img
          style={{
            width: "40%",
            left: "10%",
            bottom: "10%",
            animationDelay: `2000ms`,
          }}
          src="./inspire/sideplate1.png"
          className={`${style["inspire-images"]}`}
        ></img>
        <img
          style={{
            width: "20%",
            top: "15%",
            right: "10%",
            animationDelay: `0ms`,
          }}
          src="./inspire/Autoclawspecimen.png"
          className={`${style["inspire-images"]}`}
        ></img>
        <img
          style={{
            width: "25%",
            top: "30%",
            left: "40%",
            animationDelay: `5000ms`,
          }}
          src="./inspire/slides.png"
          className={`${style["inspire-images"]}`}
        ></img>
        <p
          style={{
            width: "30%",
            top: "25%",
            left: "5%",
          }}
          className={`${style["inspire-text"]}`}
        >
          Our new Spring Loaded claw allows us to grab and release specimens
          quickly and simply without the use of a servo for grabbing.
        </p>
        <p
          style={{
            width: "30%",
            bottom: "25%",
            right: "5%",
            textAlign: "right",
          }}
          className={`${style["inspire-text"]}`}
        >
          On the end of the horizontal slides, we have a rotating arm intake
          with a rotating claw that grabs from the inside of the samples.
        </p>
      </div>
      <div className={`${style["sponsors-container"]}`}>
        <h1 className={`${style["sponsors-title"]}`}>Our Sponsors:</h1>
        <img
          src="./sponsors.png"
          className={`${style["sponsors-image"]}`}
        ></img>
      </div>
      <ContactWidget></ContactWidget>
      <p
        style={{
          textAlign: "center",
          color: "gray",
        }}
      >
        Site design / logo © 2025 made by Tyler K. under FIRST Tech Robotics;
        licensed under CC BY-SA . updated 2025-4-18
      </p>
    </>
  );
}

export default App;
