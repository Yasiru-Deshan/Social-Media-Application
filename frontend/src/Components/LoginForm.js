import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "../Images/surge-black-logo.svg";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        body,
        {
          ContentType: "application/json",
        }
      );

      if (response.data.token != null) {
        auth.authenticate(
          response.data.token,
          response.data.firstName + " " + response.data.lastName,
          response.data.id,
          response.data.role,
          response.data.user
        );
        navigate("/home");
        return <Navigate replace to="/" />;
      } else {
        window.alert("Please check your credentials");
      }
    } catch (error) {
        window.alert("Please check your credentials");
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div
          className="text-center"
          style={{
            backgroundColor: "white",
            width: "calc(100px + 24vw)",
            marginTop: "5rem",
            marginBottom: "5rem",
            // boxShadow: "5px 8px 25px ",
            border: "1px solid #B7B7B9 ",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <Card.Body>
            <div
              style={{
                fontSize: "40px",
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
              DoomBurst
            </div>
            <div style={{ marginTop: "30px" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                    placeholder="yasiru@gmail.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <button
                    style={{
                      background:
                        "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
                      width: "100%",
                      border: "none",
                      color: "white",
                      padding: "12px 30px",
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <Card.Footer>
              Don't have an account?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </Card.Footer>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
