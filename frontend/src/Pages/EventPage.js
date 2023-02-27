import React from "react";
import LeftWidget from "../Components/LeftWidget";
import Events from "../Components/Events";
import "../Pages/Home.css";

const EventPage = ()=>{
    return (
      <div>
        {/* <img style={{float: "right", width:"10px", height:"10px",zIndex:5}} src={image1} alt=""></img> */}
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
            <Events />
          </div>
        </div>
      </div>
    );
}

export default EventPage;