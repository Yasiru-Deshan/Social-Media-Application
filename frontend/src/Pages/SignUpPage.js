import React from "react";
import Details from "../Components/Details";
import RegisterForm from "../Components/RegisterForm";
import "./LoginPage.css";


const SignUpPage = () => {
  return (
    <div className="LoginContainer">
      <div className="Row">
        <div className="Column1" >
          
          <div
            style={{
              zIndex: 3,
              position: "absolute",
              padding: "0px",
              alignItems: "center",
            }}
          >
            <RegisterForm />
          </div>
        </div>
        <div className="Column2" >
          <Details />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
