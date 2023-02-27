const express = require("express");
const {
  signUp,
  login,
  updateProfile,
  getProfile,
  uploadProfilePic,
  follow,
  getUsers,
} = require("../controllers/UserController");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/login", login);
router.post("/", signUp);
router.put("/edit", Authentication, updateProfile);
router.get("/profile/:id", Authentication, getProfile);
router.put("/profileimage", Authentication, uploadProfilePic);
router.put("/:id/follow", Authentication, follow);
router.get("/users", Authentication,getUsers);

module.exports = router;
