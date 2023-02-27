import React,{useEffect, useContext, useState} from "react";
import Carousel from "react-elastic-carousel";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import EventItem from "./EventItem";

    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 1 },
      { width: 768, itemsToShow: 2 },
      { width: 1200, itemsToShow: 4 },
    ];

const Events=()=>{

    const auth = useContext(AuthContext);
      const [events, setEvents] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": `${auth.token}`,
        "Content-Type": "application/json",
      },
    };

    const getPosts = () => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/event/`, config)
        .then((res) => {
          setEvents(res.data.events.reverse());
        });
    };

    getPosts();
  }, [auth.token]);

  return (
    <div style={{ padding: "50px" }}>
      <div style={{marginBottom:"40px"}}>
        <center>
          <h1 style={{color: "white"}}>Surge Events</h1>
          <hr style={{ backgroundColor: "white" }}></hr>
        </center>
      </div>
      <div className="carousel">
        {events.length === 0 ? (
          <div style={{ display: "flex", margin: "auto", color:"white" }}>
            <p className="playDesc">No items to show</p>
          </div>
        ) : (
          <Carousel
            breakPoints={breakPoints}
            itemsToShow={3}
            pagination={true}
            isRTL={false}
            disableArrowsOnEnd={false}
            enableSwipe={true}
            easing="ease"
          >
            {events.map((event) => {
              return (
                <EventItem
                  key={event._id}
                  id={event._id}
                  image={event.image}
                  likes={event.likes}
                  caption={event.caption}
                  date={event.createdAt}
                />
              );
            })}
          </Carousel>
        )}{" "}
      </div>
    </div>
  );
}

export default Events;