import React, { useState, useContext, useEffect } from "react";
import "../Pages/Home.css";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Post from "./Post";

const Feed = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [mdal, setModal] = useState(false);
  const [like, setLike] = useState([]);

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
  
  }, [auth.token]);

  

  const sortPostsByLikes = (arr) =>{
    
     let i=0;

     for (var j = 0; j < arr.length - 1; j++) {
       for (i = 0; i < arr.length; i++) {
         if (arr[i].likes.length > arr[i + 1].likes.length) {
            let num = arr[i].likes.length;
            arr[i] = arr[i + 1];
            arr[i + 1].likes.length = num;
         }
       }
     }

    // console.log(arr.reverse());
     setPosts(arr);

    //  setPosts(like.sort().reverse());
     

//     let postList = posts;

//     console.log(postList);

//     for(i=0;i<posts.length;i++){
//       for(j=1;j<posts.length;j++){
//           if(posts[i].likes.length<=posts[j].likes.length){
//               posts[k]=posts[j];         
//               k++;
//           }
//       }
//     }
  
//     setPosts(posts);
// console.log(posts);
//     return posts;
    
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
            width: "calc(200px + 15vw)",
            height: "240px",
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
        <h1 style={{ textAlign: "center" }}>Apply Filter</h1>

        <div style={{ display: "flex", margin: "10px" }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Sort By Date
            </label>
          </div>
          <div className="form-check" style={{marginLeft:"60px"}}>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Sort By Likes
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            fontSize: "calc(0.5vw + 12px)",
            borderRadius: "3px",
            padding: "calc(2px + 1vw)",
            color: "#fff",
            background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
            border: "none",
            width: "100%",
            marginTop: "10px",
            fontStyle: "bold",
          }}
          onClick={()=>sortPostsByLikes(posts)}
        >
          Apply
        </button>
      </Modal>
      <div style={{ float: "right", marginRight: "10px",cursor:"pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="white"
          className="bi bi-sort-up"
          viewBox="0 0 16 16"
          onClick={() => setModal(true)}
        >
          <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
        </svg>
      </div>
      <div style={{marginTop:"20px", marginBottom:"100px"}}>
      {console.log(posts)}
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            image={post.image}
            likes={post.likes}
            profilePic={post.user.image}
            userName={post.user.userName}
            date={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
