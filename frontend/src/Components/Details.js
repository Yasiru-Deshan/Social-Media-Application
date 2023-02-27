import React from "react";
import video from "./../Images/video.mp4";

const Details = () =>{
    return (
      <div>
        <div
          // style={{
          //   position: "absolute",
          //   top: "0",
          //   right: "0",
          //   bottom: "0",
          //   left: "0",
          //   width: "60%",
          //   height: "120%",
          //   overflow: "hidden",
          // }}
        >
          <video
            style={{
              width: "100%",
              height: "100%",
              //-o-object-fit: cover;
              objectFit: "cover",
              marginTop: "-350px",
              //background: "#232a34",
            }}
            src={video}
            alt=""
            autoPlay="true"
            loop
          />
        </div>
      </div>
    );
}

export default Details;