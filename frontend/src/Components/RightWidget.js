import React, { useContext, useState, useEffect } from "react";
import "../Pages/Home.css";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const RightWidget = () => {
  const auth = useContext(AuthContext);
  const [mdal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
    const [signrequest, setSignrequest] = useState();
    const [image, setImgurl] = useState();
    const [file, setFile] = useState();
    const [profilePic, setProfilePic] = useState();
    const [profileImage, setProfileImage] = useState();
      const [followers, setFollowers] = useState([]);
      const [following, setFollowing] = useState([]);
       const [posts, setPosts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };
    const getProfile = () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/auth/profile/${auth.userId}`,
          config
        )
        .then((res) => {
          setUsername(res.data.userName);
          setBio(res.data.bio);
          setProfilePic(res.data.image);
          setFirstname(res.data.firstName);
          setLastname(res.data.lastName);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setPosts(res.data.posts);
        });
    };
    getProfile();
  }, [auth.userId, auth.token,mdal]);

  const editHandler = async (e) => {
    let update;

    e.preventDefault();
    const updatedProfile = {
      userName: username,
      bio: bio,
      id: auth.userId,
    };

    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      update = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/auth/edit`,
        updatedProfile,
        config
      );

      if (update) {
        window.alert("Profile has been updated");
       setModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

    const onImageChange = async (e) => {
      let file = e.target.files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        let ur = URL.createObjectURL(e.target.files[0]);
        setProfileImage(ur);
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
              window.alert(
                "Somthing went wrong when uploading the image"
              );
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

        const res = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/auth/profileimage`,
          body,
          config
        );
        if (res.status === 200) {
          window.alert("Profile Picture Updated");
          setFile(null);
          setProfileImage(image);
        }
      }
    } catch (error) {}
  };

  return (
    <div>
     
      <div className="ProfileWrapper">
        <img className="ProfilePic" src={profilePic} alt="" />
        <h3 style={{ color: "white", textAlign: "center" }}>
          {firstName} {lastName}
        </h3>
        <h4 style={{ color: "#BBBBBC", textAlign: "center" }}>{username}</h4>
        <hr style={{ color: "white" }}></hr>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "white",
                marginTop: "40px",
                width: "100%",
                margin: "auto",
              }}
            >
              <div style={{ width: "30%", textAlign: "center" }}>
                <h6>{posts.length} Posts</h6>
              </div>
              <div style={{ width: "30%", textAlign: "center" }}>
                <h6>{followers.length} Followers</h6>
              </div>
              <div style={{ width: "30%", textAlign: "center" }}>
                <h6>{following.length} Following</h6>
              </div>
            </div>
            <div
              style={{ color: "white", marginTop: "20px", textAlign: "center" }}
            >
              <h6>{bio}</h6>
            </div>
          </div>
        </div>

        <div
          className="mb-3"
          style={{ width: "100%", marginTop: "50px", textAlign: "center" }}
        >
          {/* <button
            style={{
              background: "linear-gradient(to right, #12c2e9, #c471ed)",
              width: "40%",
              display: "flex",
              margin: "auto",
              marginTop: "10px",
              border: "none",
              color: "white",
              padding: "11px 40px",
              borderRadius: "2px",
            }}
            onClick={() => setModal(true)}
          >
            Edit Profile
          </button> */}
          <Link to={`/profile/${auth.userId}`}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "150px" }}
              
            >
              View My Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightWidget;
