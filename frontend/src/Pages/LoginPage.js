import React from "react";
import Details from "../Components/Details";
import LoginForm from "../Components/LoginForm";
import './LoginPage.css';
import image from "./../Images/surge-family3.jpg";

const LoginPage = () =>{

    return (
      <div className="LoginContainer">
        <div className="Row">
          <div className="Column1">
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                width: "60%",
                height: "120%",
                overflow: "hidden",
              }}
            >
              {/* <img
                style={{
                  width: "100%",
                  height: "100%",
                  //oObjectFit: "cover",
                  objectFit: "cover",
                  marginTop: "0px",
                  backgroundColor: "#232a34",
                }}
                src={image}
                alt=""
              /> */}
            </div>

            <div
              style={{
                zIndex: 3,
                position: "absolute",
                padding: "8px 24px",
                alignItems: "center",
              }}
            >
              <LoginForm />
            </div>
          </div>
          <div className="Column2">
            <Details />
          </div>
        </div>
      </div>
    );

}

export default LoginPage