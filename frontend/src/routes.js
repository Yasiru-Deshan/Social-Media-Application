import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import EventPage from "./Pages/EventPage";
import ExplorePage from "./Pages/ExplorePage";
import ProfilePage from "./Pages/ProfilePage";

const getRoutes = (token)=>{
    let routes;

    routes = (
      <Routes>
        <Route path="/" element={token ? <Home /> : <LoginPage />} exact />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" />}
          exact
        />
        <Route
          path="/signup"
          element={token ? <Home /> : <SignUpPage />}
          exact
        />
        <Route
          path="/profile/:id"
          element={token ? <ProfilePage /> : <LoginPage />}
          exact
        />
        <Route
          path="/events"
          element={token ? <EventPage /> : <LoginPage />}
          exact
        />
        <Route
          path="/explore"
          element={token ? <ExplorePage /> : <LoginPage />}
          exact
        />
        <Route path="/" element={<LoginPage />} exact />
      </Routes>
    );

    return routes;
};

export default getRoutes;