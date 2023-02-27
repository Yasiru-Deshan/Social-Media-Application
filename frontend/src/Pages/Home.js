import React, { useState } from "react";
import "./Home.css";
import LeftWidget from "../Components/LeftWidget";
import Feed from "../Components/Feed";
import RightWidget from "../Components/RightWidget";
import image1 from "../Images/idea-svgrepo-com.svg";
import image2 from "../Images/idea-svgrepo-com (1).svg";

const Home = () => {
  const [blackTheme, redTheme] = useState(true);
  
  return (
    <div>
      {blackTheme ? (
        <div>
        {/* <img style={{float: "right", width:"10px", height:"10px",zIndex:5}} src={image1} alt=""></img> */}
        <div className="HomeContainer">
        
          <div className="Col1" style={{ backgroundColor: "#101522" }}>
            <LeftWidget />
          </div>
          <div
            className="Col2"
            style={{
              backgroundColor: "#101522",
              marginLeft: "0.1%",
              marginRight: "0.1%",
            }}
          >
            <Feed />
          </div>
          <div
            className="Col3"
            style={{
              background: "#101522",
            }}
          >
            <RightWidget />
          </div>
        </div>
        </div>
      ) : (
        <div className="HomeContainer">
          <div className="Col1" style={{ backgroundColor: "#E62B18" }}>
            <LeftWidget />
          </div>
          <div
            className="Col2"
            style={{
              backgroundColor: "#E62B18",
              marginLeft: "0.1%",
              marginRight: "0.1%",
            }}
          >
            <Feed />
          </div>
          <div
            className="Col3"
            style={{
              background: "#E62B18",
            }}
          >
            <RightWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
