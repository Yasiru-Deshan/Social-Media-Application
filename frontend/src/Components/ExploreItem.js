import React,{useState, useContext, useEffect} from "react";
import Modal from "react-modal";
import Heart from "../Images/love-heart-svgrepo-com.svg";
import FilledHeart from "../Images/love-shapes-svgrepo-com.svg";
import Moment from "react-moment";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ExploreItem = (props) => {
      const [mdal, setModal] = useState(false);
        const [isLiked, setIsLiked] = useState(false);
        const auth = useContext(AuthContext);  
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
          `${process.env.REACT_APP_BASE_URL}/api/post/${id}/like`,
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
            
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "50px",
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

        <div
          className="text-center"
          style={{
            backgroundColor: "white",
            width: "calc(100px + 24vw)",
            margin: "auto",
            marginBottom: "0rem",
            border: "1px solid #B7B7B9 ",
            borderRadius: "5px",
          }}
        >
          <div className="PostFooter" style={{marginTop:"15px"}}>
            <div className="UserName">
              <img className="ProfileIcon" src={props.profilePic} alt="" />
              <p>{props.userName}</p>
            </div>
          </div>
          <img className="Post" src={props.image} alt="" />
          <div className="PostFooter">
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

            <div className="Date" style={{marginLeft:"12rem"}}>
              <p>
                <Moment fromNow>{props.date}</Moment>
              </p>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="text-center"
        style={{
          padding:"5px",
          backgroundColor: "transparent",
          
          margin: "auto",
          float: "left",
        }}
      >
        <img
          onClick={() => setModal(true)}
          className="ExploreItem"
          src={props.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default ExploreItem;
