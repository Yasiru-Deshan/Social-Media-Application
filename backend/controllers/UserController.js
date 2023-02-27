const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//signup
const signUp = async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    userName,
    position,
    gender,
    bio,
  } = req.body;

  let user;
  try {
    user = new User({
      email,
      password,
      firstName,
      lastName,
      userName,
      position,
      gender,
      bio,
      role: "user",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(data, "surge", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        name: firstName,
        id: user.id,
        role: user.role,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//login
const login = async (req, res, next) => {
  ("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No user found for this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Email and password does not match",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    user.password = undefined;
    jwt.sign(data, "surge", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//update profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);

    await user.updateOne({ $set: req.body });
    res.status(200).json("Profile has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//getprofile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('posts').populate({path:'posts',populate:{path:'user'}});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const uploadProfilePic = async (req, res, next) => {
  const { image } = req.body;
  "uploading", image;
  const userId = req.user.id;
  try {
    let surgeUser = await User.findById(userId);
    surgeUser.image = image;
    await surgeUser.save();
    return res.status(200).json({ msg: "profile picture updated" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const follower = await User.findById(req.body.userId);

    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await follower.updateOne({ $push: { following: req.params.id } });
      res.status(200).json("user has been followed");
    } else {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await follower.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json("user has been unfollowed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate();

    return res.status(200).json({ msg: "user Found", users });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};



exports.signUp = signUp;
exports.login = login;
exports.updateProfile = updateProfile;
exports.getProfile = getProfile;
exports.uploadProfilePic = uploadProfilePic;
exports.follow = follow;
exports.getUsers = getUsers;
