import React, { useState, useContext, useEffect } from "react";
import Heart from "../Images/love-heart-svgrepo-com.svg";
import FilledHeart from "../Images/love-shapes-svgrepo-com.svg";
import Moment from "react-moment";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Image from "../Images/profile-pic (4).png"; 

const EventItem = (props) => {
  const auth = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.length);

  const likeHandler = async (id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": `${auth.token}`,
          "Content-Type": "application/json",
        },
      };
      const newLike = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/event/${id}/like`,
        { userId: auth.userId },
        config
      );
      if (newLike) {
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
      } else {
        window.alert("Something went wrong..");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.likes.includes(auth.userId)) {
      setIsLiked(true);
    }
  }, [auth.userId, props.likes]);

  return (
    <div
      className="text-center"
      style={{
        backgroundColor: "white",
        width: "calc(100px + 24vw)",
        margin: "auto",
        marginBottom: "1rem",
        border: "1px solid #B7B7B9 ",
        borderRadius: "5px",
      }}
    >
      <img className="Post" src={props.image} alt="" />
      <div className="EventCaption">
        {props.caption}
      </div>
      <hr style={{marginInline:"10px"}}></hr>
      <div className="EventFooter">
        <div className="Icons">
          {isLiked ? (
            <img
              className="Icon"
              src={Heart}
              alt=""
              onClick={() => likeHandler(props.id)}
            ></img>
          ) : (
            <img
              className="Icon"
              src={FilledHeart}
              alt=""
              onClick={() => likeHandler(props.id)}
            ></img>
          )}
        </div>
        <div className="LikesCount">{likeCount}</div>

        <div className="UserName">
          <img className="ProfileIcon" src={Image} alt="" />
          <p>Admin</p>
        </div>
        <div className="Date">
          <p>
            <Moment fromNow>{props.date}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
