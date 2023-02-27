import React, { useContext, useRef } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Image from "../Images/surge-black-logo.svg";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const fname = useRef();
  const lname = useRef();
  const password = useRef();
  const email = useRef();
  const uname = useRef();
  const gender = useRef();
  const captchaRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newMember = {
      firstName: fname.current.value,
      lastName: lname.current.value,
      userName: uname.current.value,
      password: password.current.value,
      email: email.current.value,
      //gender: gender.current.value,
      role: "user",
    };

      // const token = captchaRef.current.getValue();
      //       console.log(token);
      // captchaRef.current.reset();

      //         await axios
      //           .post(`${process.env.REACT_APP_BASE_URL}/api/recaptcha/`, { token })
      //           .then((res) => console.log(res))
      //           .catch((error) => {
      //             console.log(error);
      //           });

    try {
      const newUser = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/`,
        newMember,
        {
          ContentType: "application/json",
        }
      );
      if (newUser.data.token != null) {
        auth.authenticate(
          newUser.data.token,
          newUser.data.firstName + " " + newUser.data.lastName,
          newUser.data.id,
          newUser.data.role,
          newUser.data.user
        );
      }
      if (newUser) {
        window.alert("Signed Up Successfully");
        navigate("/");
        return navigate("/");
      } else {
        window.alert("Something Went Wrong");
      }
    } catch (err) {
      window.alert("Server error please reload");
    }
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
                marginTop: "0px",
              }}
            >
              DoomBurst
            </div>

            <div style={{ marginTop: "30px" }}>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firstName"
                    ref={fname}
                    // value={password}
                    //  onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastName"
                    ref={lname}
                    // value={password}
                    //  onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    id="userName"
                    ref={uname}
                    // value={password}
                    //  onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    ref={email}
                    // value={email}
                    // onChange={handleChange}
                    required
                    placeholder="yasiru@gmail.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    ref={password}
                    // value={password}
                    //  onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="gender">Gender</label>
                  <select className="form-control" ref={gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div> */}

                {/* <div className="mb-3">
                  <ReCAPTCHA
                    style={{ display: "flex", margin: "auto",width:"20rem" }}
                    sitekey="6LejZS0kAAAAAHzOhNdWYhsb_Jt07py4aO3h3wmv"
                    ref={captchaRef}
                  />
                </div> */}

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
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <Card.Footer>
              Already have an account?
              <Link to="/" style={{ textDecoration: "none" }}>
                Sign In
              </Link>
            </Card.Footer>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
