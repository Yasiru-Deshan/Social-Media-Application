import React, { useContext, useState, useEffect, useRef } from "react";
import Image from "../Images/surge-global-logo-in-white.svg";
import "../Pages/Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import "./Navbar.css";
import { IconContext } from "react-icons";

const LeftWidget = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [mdal, setModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [notificationModal, setnotificationModal] = useState(false);
  const [signrequest, setSignrequest] = useState();
  const [image, setImgurl] = useState();
  const [file, setFile] = useState();
  const [postImage, setPostImage] = useState();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [caption,setCaption] = useState();
  let [users,setUsers] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    const getPosts = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/post/`, config)
        .then((res) => {
          setPosts(res.data.posts.reverse());
        });
    };

    getPosts();
  }, [auth.token,mdal]);

  const getUsers = ()=>{
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/users`, config)
    .then((res) => {
            setUsers(res.data.users);
          });
  }  

    useEffect(() => {
      const config = {
        headers: {
          "x-auth-token": `${auth.token}`,
          "Content-Type": "application/json",
        },
      };

      const getEvents = () => {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/event/`, config)
          .then((res) => {
            setEvents(res.data.events.reverse());
          });
      };

      getEvents();
    }, [auth.token, adminModal]);

  const signOut = () => {
    auth.logout();
    navigate("/");
  };

  // const submitHandler = async(e)=>{
  //   e.preventDefault();

  //   const newPost = {
  //     image:post.current.value
  //   }

  // try {
  //   const config = {
  //       headers: {
  //         "x-auth-token": `${auth.token}`,
  //         "Content-Type": "application/json",
  //       },
  //     },
  //     newOne = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/api/post/new`,
  //       newPost,
  //       config
  //     );

  //   if (newOne) {
  //     window.alert("Post Uploaded");

  //   }
  // } catch (err) {
  //   console.log(err);

  // }
  // }
  const onImageChange = async (e) => {
    let file = e.target.files[0];
    if (file.type === "image/jpeg" || file.type === "image/png") {
      let ur = URL.createObjectURL(e.target.files[0]);
      setPostImage(ur);
      setFile(file);
      let signed = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/aws/signed?filename=${file.name}&filetype=${file.type}`
      );
      if (signed.status !== 200) {
        window.alert("Somthing went wrong please select the image again");
      } else {
        let re = signed.data.signedRequest;
        let reulr = signed.data.url;
        setSignrequest(re);
        setImgurl(reulr);
      }
    } else {
      window.alert("Please upload jpeg or png image");
    }
  };

  function uploadFile(file, signedRequest) {
    const xhr = new XMLHttpRequest();
    if (file) {
      xhr.open("PUT", signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            return true;
          } else {
            window.alert("Somthing went wrong when uploading the image");
            return false;
          }
        }
      };
      xhr.send(file);
    } else {
      window.alert("No file selected");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file != null) {
        uploadFile(file, signrequest);

        const body = {
          image,
        };
        const config = {
          headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/post/new`,
          body,
          config
        );
        if (res.status === 200) {
          window.alert("Post Uploaded");
          setModal(false);
          setFile(null);
          setPostImage(null);
        }
      }
    } catch (error) {}
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file != null) {
        uploadFile(file, signrequest);

        const body = {
          image,
          caption
        };
        const config = {
          headers: {
            "x-auth-token": `${auth.token}`,
            "Content-Type": "application/json",
          },
        };

        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/event/new`,
          body,
          config
        );
        if (res.status === 200) {
          window.alert("Event Uploaded");
          setAdminModal(false);
          setFile(null);
          setPostImage(null);
        }
      }
    } catch (error) {}
  };

  if (search.length > 0) {
    users = users.filter((i) => {
      return i.userName.toLowerCase().match(search.toLowerCase());
    });
  }
  return (
    <div>
      <Modal
        isOpen={mdal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(300px + 15vw)",
            height: "520px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            setModal(false);
          }}
        ></button>
        <h1 style={{ textAlign: "center" }}>New Post</h1>
        <div className="col-lg-8 col-md-8" style={{ margin: "auto" }}>
          {" "}
          <div className="ImageUploadContainer">
            {postImage ? (
              <img
                src={postImage.replace(/\s+/g, "%20")}
                alt=""
                name="image"
                className="PostUploadPreview"
              />
            ) : (
              <label htmlFor="file" className="ImageUploadLabel ">
                Drag and drop a image or click here
              </label>
            )}

            <input
              required
              onChange={onImageChange}
              type="file"
              className="ImageUploadInput"
            />
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Label style={{ color: "blue" }}>Image URI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URI"
              ref={post}
            /> */}

          <button
            type="submit"
            style={{
              fontSize: "calc(0.5vw + 12px)",
              borderRadius: "3px",
              padding: "calc(10px + 1vw)",
              color: "#fff",
              background:
                "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
              border: "none",
              width: "100%",
              marginTop: "10px",
              fontStyle: "bold",
            }}
          >
            Create
          </button>
        </Form>
      </Modal>

      <Modal
        isOpen={adminModal}
        onRequestClose={() => setAdminModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(300px + 15vw)",
            height: "520px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            setAdminModal(false);
          }}
        ></button>
        <h1 style={{ textAlign: "center" }}>New Event</h1>
        <div className="col-lg-8 col-md-8" style={{ margin: "auto" }}>
          {" "}
          <div className="ImageUploadContainer">
            {postImage ? (
              <img
                src={postImage.replace(/\s+/g, "%20")}
                alt=""
                name="image"
                className="PostUploadPreview"
              />
            ) : (
              <label htmlFor="file" className="ImageUploadLabel ">
                Drag and drop a image or click here
              </label>
            )}

            <input
              required
              onChange={onImageChange}
              type="file"
              className="ImageUploadInput"
            />
          </div>
        </div>
        <Form onSubmit={handleEventSubmit}>
          {/* <Form.Label style={{ color: "blue" }}>Image URI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URI"
              ref={post}
            /> */}
          <Form.Label style={{ color: "blue" }}>Caption</Form.Label>
          <Form.Control
            type="text"
            defaultValue={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{
              fontSize: "calc(0.5vw + 12px)",
              borderRadius: "3px",
              padding: "calc(10px + 1vw)",
              color: "#fff",
              background:
                "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
              border: "none",
              width: "100%",
              marginTop: "10px",
              fontStyle: "bold",
            }}
          >
            Create
          </button>
        </Form>
      </Modal>

      <Modal
        isOpen={searchModal}
        onRequestClose={() => setSearchModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(300px + 15vw)",
            height: "520px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            setSearchModal(false);
          }}
        ></button>
        <h1 style={{ textAlign: "center" }}>Search</h1>

        <div style={{ margin: "auto" }}>
          <div className="input-group">
            <div className="form-outline" style={{ width: "100%" }}>
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
            </div>
          </div>
          {users.map((user) => {
            return (
             
                <div
                  style={{
                    width: "100%",
                    marginTop: "2px",
                    backgroundColor: "#101522",
                    borderRadius: "5px",
                    color: "white",
                    textDecoration: "none",
                  }}
                  
                ><Link to={`/profile/${user._id}`}>
                  <img
                    className="ProfileIcon"
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    src={user.image}
                    alt=""
                  /></Link>
                  <span style={{textDecoration:"none"}}>
                    {user.userName}
                  </span>
                </div>
              
            );
          })}
        </div>
      </Modal>

      <Modal
        isOpen={notificationModal}
        onRequestClose={() => setnotificationModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(300px + 15vw)",
            height: "520px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            setnotificationModal(false);
          }}
        ></button>
        <h1 style={{ textAlign: "center" }}>Notifications</h1>

        <div style={{ margin: "auto" }}>
          <div
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                marginTop: "2px",
                backgroundColor: "#101522",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <img
                className="ProfileIcon"
                style={{ marginTop: "10px", marginLeft: "5px" }}
                
                alt=""
              />
              <h7>{auth.fullName} started following you.</h7>
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "2px",
                backgroundColor: "#101522",
                borderRadius: "5px",
                color: "white",
              }}
            >
              <img
                className="ProfileIcon"
                style={{ marginTop: "10px", marginLeft: "5px" }}
                
                alt=""
              />
              <h7>{auth.fullName} liked your post.</h7>
            </div>
          </div>
        </div>
      </Modal>

      <div
        style={{
          fontSize: "40px",
          color: "white",
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        DOOMBURST
      </div>

      <div style={{ marginTop: "60px", marginLeft: "25px" }}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav>
            <ul className="nav-menu-items">
              <li className="nav-text">
                <Link to="/home">
                  <IoIcons.IoMdHome />
                  <span>Home</span>
                </Link>
              </li>
              <li
                className="nav-text"
                onClick={() => {
                  setSearchModal(true);
                  getUsers();
                }}
              >
                <Link>
                  <IoIcons.IoIosSearch />
                  <span>Search</span>
                </Link>
              </li>
              {auth.role === "user" && (
                <li className="nav-text">
                  <Link to="/explore">
                    <IoIcons.IoMdCompass />
                    <span>Explore</span>
                  </Link>
                </li>
              )}
              <li
                className="nav-text"
                onClick={() => setnotificationModal(true)}
              >
                <Link>
                  <IoIcons.IoMdNotifications />
                  <span>Notifications</span>
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/events">
                  <IoIcons.IoMdListBox />
                  <span>Messages</span>
                </Link>
              </li>
              {auth.role === "user" && (
                <li className="nav-text" onClick={() => setModal(true)}>
                  <Link>
                    <IoIcons.IoMdAddCircle />
                    <span>Create</span>
                  </Link>
                </li>
              )}
              {auth.role === "admin" && (
                <li className="nav-text" onClick={() => setAdminModal(true)}>
                  <Link>
                    <IoIcons.IoMdAddCircle />
                    <span>Create</span>
                  </Link>
                </li>
              )}
              <li className="nav-text" onClick={signOut}>
                <Link>
                  {" "}
                  <IoIcons.IoMdLogOut />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default LeftWidget;
