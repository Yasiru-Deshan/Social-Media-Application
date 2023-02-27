import React from "react";
import LeftWidget from "../Components/LeftWidget";
import "../Pages/Home.css";
import Explore from "../Components/Explore";

const ExplorePage = () => {
  return (
    <div>
     
      <div className="HomeContainer">
        <div className="Col1" style={{ backgroundColor: "#101522" }}>
          <LeftWidget />
        </div>
        <div
          className="Col4"
          style={{
            backgroundColor: "#101522",
            marginLeft: "0.1%",
            marginRight: "0.1%",
          }}
        >
          <Explore />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
