import "./letter.css";
import React from "react";
import lineSvg from "../../Assets/svg/line.svg";
function Letter() {
  return (
    <div className="letter-section">
      <div className="letter-body-section">
        <img className="svg" src={lineSvg} alt="linesvg" />
        <p className="letter-body">
          {" "}
          Hey princess, I just wanted to make a site dedicated to show my
          appreciation and love for you. And to start it off I wanted to write a
          cute little letter for you 😊. I just wanted to show you to know how
          much I love you ❤. You mean the world to me and I just want this site
          to have that way we can remember all of the good times together and
          just in general. This will be our little scrapbook that we can always
          look back to and a bunch more memories to come. Each time we look at
          it we can just smile or laugh at the good times we had together. I
          hope you like it and there will always be more memories to come!
        </p>
        <img className="svg rotate" src={lineSvg} alt="linesvg" />
      </div>
    </div>
  );
}

export default Letter;
