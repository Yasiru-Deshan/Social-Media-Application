import React,{useEffect, useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ExploreItem from "./ExploreItem";

const Explore = () =>{

        const auth = useContext(AuthContext);
        const [posts, setPosts] = useState([]);

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
    return (
      <div>
        <div style={{ width: "1200px", padding:"0 130px"}}>
        
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
}

export default Explore;