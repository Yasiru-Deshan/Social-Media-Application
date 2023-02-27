const express = require("express");
const {
  createEvent,
  getEvents,
  likeEvent,
} = require("../controllers/EventController");
const AdminAuthentication = require("../middleware/AdminAuthentication");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/new", AdminAuthentication, createEvent);
router.get("/", Authentication, getEvents);
router.put("/:id/like",Authentication, likeEvent);

module.exports = router;
