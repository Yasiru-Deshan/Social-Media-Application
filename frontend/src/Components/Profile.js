import React, { useEffect, useContext, useState } from "react";
import Carousel from "react-elastic-carousel";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import EventItem from "./EventItem";
import ExploreItem from "./ExploreItem";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Form } from "react-bootstrap";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 4 },
];

const Profile = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [username,setUsername]  = useState();
  const [firstName, setFirstname] = useState();
  const [lastName, setLastname] = useState();
  const [followers,setFollowers] = useState([]);
  const [following,setFollowing] = useState([]);
  const [img, setImage] = useState();
  const [bio,setBio]  =useState();
  const [follow, setfollow] = useState(false);
   const [mdal, setModal] = useState(false);
    const [toggle, setToggle] = useState(false);
  const id = useParams().id;
   const [signrequest, setSignrequest] = useState();
   const [image, setImgurl] = useState();
   const [file, setFile] = useState();
   const [profilePic, setProfilePic] = useState();
   const [profileImage, setProfileImage] = useState();

  //  useEffect(() => {
  //    const config = {
  //      headers: {
  //        "x-auth-token": `${auth.token}`,
  //        "Content-Type": "application/json",
  //      },
  //    };

  //    const getUser = () => {
  //      axios
  //        .get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/${id}`, config)
  //        .then((res) => {
  //          setUserName(res.data.userName);
  //          setFollowers(res.data.followers);
  //          setFollowing(res.data.following);
  //          setImage(res.data.image);
  //          setPosts(res.data.posts);
  //          setBio(res.data.bio);
  //          console.log(res.data)
  //        });
  //    };

  //    getUser();
  //  }, [auth.token,id]);

   useEffect(() => {
     if (followers.includes(auth.userId)) {
       setfollow(true);
     }else{
      setfollow(false);
     }
   }, [auth.userId, followers,id]);

   const followHandler = async(id)=>{
try {
     const config = {
       headers: {
         "x-auth-token": `${auth.token}`,
         "Content-Type": "application/json",
       },
     };
     const newFollower = await axios.put(
       `${process.env.REACT_APP_BASE_URL}/api/auth/${id}/follow`,
       { userId: auth.userId },
       config
     );if (newFollower) {
       console.log("user followed")
     } else {
       window.alert("Something went wrong..");
     }
   }catch (err) {
     console.log(err);
   }
}

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
        `${process.env.REACT_APP_BASE_URL}/api/auth/profile/${id}`,
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
        setPosts(res.data.posts.reverse());
      });
  };
  getProfile();
}, [auth.userId, auth.token, mdal,id]);

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
    <div style={{ padding: "50px" }}>
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
            width: "calc(200px + 15vw)",
            height: "600px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "70px",
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
        <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
        <div
          className="row  text-center mb-0 justify-content-center"
          style={{ width: "60%", margin: "auto" }}
        >
          <img
            src={profilePic}
            alt=""
            width="100"
            className="img-fluid  rounded-circle mb-3 img-thumbnail shadow-sm"
          />
        </div>
        {toggle ? (
          <React.Fragment>
            <form
              method="post"
              style={{ display: "flex", margin: "auto" }}
              //onSubmit={handleSubmit
            >
              <div className="form-group" controlId="formGridAddress1">
                <input
                  style={{ display: "flex", margin: "auto" }}
                  type="file"
                  id="custom-file"
                  label="Add image"
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={(e) => onImageChange(e)}
                  custom
                />
              </div>
              <button
                style={{ marginLeft: "-60px" }}
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update
              </button>
            </form>
            <button
              style={{ display: "flex", margin: "auto", marginTop: "10px" }}
              className="btn btn-danger"
              onClick={() => setToggle(false)}
            >
              cancel
            </button>
          </React.Fragment>
        ) : (
          <button
            style={{ display: "flex", margin: "auto" }}
            className="btn btn-primary"
            onClick={() => setToggle(true)}
          >
            Change profile picture
          </button>
        )}
        <Form onSubmit={editHandler}>
          <Form.Label style={{ color: "blue" }}>Username</Form.Label>
          <Form.Control
            type="text"
            defaultValue={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <Form.Label style={{ color: "blue" }}>Bio</Form.Label>
          <Form.Control
            type="text"
            defaultValue={bio}
            onChange={(e) => {
              setBio(e.target.value);
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
            Done
          </button>
        </Form>
      </Modal>

      <div style={{ marginBottom: "40px" }}>
        <div style={{ float: "right", width: "50%" }}>
          <h1 style={{ color: "white" }}>{username}</h1>
          {auth.userId !== id ? (
            <div>
              {follow ? (
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "150px", marginTop: "20px" }}
                  onClick={() => {
                    setfollow(false);
                    followHandler(id);
                  }}
                >
                  Following
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "150px", marginTop: "20px" }}
                  onClick={() => {
                    setfollow(true);
                    followHandler(id);
                  }}
                >
                  Follow
                </button>
              )}{" "}
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "150px", marginTop: "20px" }}
                onClick={() => {
                }}
              >
                Message
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "150px", marginTop: "20px" }}
              onClick={() => {
                followHandler(id);
                setfollow(true);
                setModal(true);
              }}
            >
              Edit Profile
            </button>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "white",
              marginTop: "30px",
              width: "70%",
            }}
          >
            <div style={{ width: "30%" }}>
              <h6>{posts.length} Posts</h6>
            </div>
            <div style={{ width: "30%" }}>
              <h6>{followers.length} Followers</h6>
            </div>
            <div style={{ width: "30%" }}>
              <h6>{following.length} Following</h6>
            </div>
          </div>
          <div style={{ color: "white", marginTop: "20px" }}>
            <h6>{bio}</h6>
          </div>
        </div>

        <img
          src={profilePic}
          alt=""
          width="100"
          className="ProfilePic"
          style={{ height: "200px", width: "200px" }}
        />

        <hr style={{ backgroundColor: "white" }}></hr>
      </div>
      <div style={{ width: "1200px", padding: "0 80px" }}>
        {posts.map((post) => {
          return (
            <ExploreItem
              key={post._id}
              id={post._id}
              image={post.image}
              likes={post.likes}
              profilePic={post.user.image}
              userName={post.user.userName}
              date={post.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
