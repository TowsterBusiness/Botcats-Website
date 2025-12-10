import React, { useEffect } from "react";
import style from "./App.module.css";

const cardData = [
  {
    title: "Innovation",
    content:
      "Researching methods of weight optimization to increase maneuverability and acceleration.",
  },
  {
    title: "Community",
    content:
      "In the last year, we designed and donated dog and cat toys to shelters affected by the LA fires, gave presentations to five different local schools, and connected with an FTC team in Libya",
  },

    

  {
    title: "STEM",
    content:
      "Our recent growth has welcomed a new wave of students dedicated to engineering bold designs, mentoring peers, and serving our community.",
  },
  {
    title: "Growth",
    content:
      "Last year, we won our League Tournament, advanced to Regionals and placed second for Inspire, and this year we are confident we can achieve our competition goals.",
  },
];

function ScrollingInfo() {
  useEffect(() => {}, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className={style["scrolling-title"]}>Achievements</div>
      </div>
      <div className={style["scrolling-container"]}>
        <div className={style["scrolling-content"]}>
          {[...cardData, ...cardData].map((item, index) => (
            <div className={style.card} key={index}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ScrollingInfo;
