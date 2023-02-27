const express = require("express");
const axios = require("axios");
const router = express.Router();

//POST route
router.post("/", async (req, res) => {
  //Destructuring response token from request body
  const { token } = req.body;

  //sends secret key and response token to google
  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=6LejZS0kAAAAAOv_7Ct6m0tdi4tm1eVxEqI-74jw&response=${token}`
  );

  //check response status and send back to the client-side
  if (res.status(200)) {
    res.send("Human 👨 👩");
  } else {
    res.send("Robot 🤖");
  }
});

module.exports = router;
