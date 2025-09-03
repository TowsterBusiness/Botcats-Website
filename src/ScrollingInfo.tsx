import React, { useEffect } from "react";
import style from "./App.module.css";

const cardData = [
  {
    title: "Innovation",
    content: "We build creative and effective robot designs.",
  },
  {
    title: "Teamwork",
    content: "Collaboration is the key to our success on and off the field.",
  },
  {
    title: "Community",
    content: "Engaging with and giving back to our community.",
  },
  {
    title: "STEM",
    content: "Promoting Science, Technology, Engineering, and Math.",
  },
  {
    title: "Gracious Professionalism",
    content: "Competing with integrity and respect for all.",
  },
];

function ScrollingInfo() {
  useEffect(() => {}, []);

  return (
    <>
      <div className={style["scrolling-title"]}>Achievements</div>
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
