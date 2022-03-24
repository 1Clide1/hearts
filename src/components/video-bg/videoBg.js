import React from "react";
// import video from src
import pinkBg from "../../Assets/vids/pink-bg.mp4";
// import css
import "./video-bg.css";
function VideoBg() {
  return (
    <video className="video-bg" autoPlay loop muted>
      <source src={pinkBg} type="video/mp4" />
    </video>
  );
}

export default VideoBg;
