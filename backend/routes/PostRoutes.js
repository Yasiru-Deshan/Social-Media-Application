const express = require("express");
const { createPost, getPosts, likePost, updateProfile } = require("../controllers/PostController");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/new", Authentication, createPost);
router.get("/", Authentication,getPosts);
router.put("/:id/like", likePost);


module.exports = router;
