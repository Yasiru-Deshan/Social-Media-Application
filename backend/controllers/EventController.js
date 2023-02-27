const User = require("../models/User");
const Event = require("../models/Event");

//create posts
const createEvent = async (req, res, next) => {
  try {

    const newEvent = new Event({
      user: req.user.id,
      image: req.body.image,
      caption: req.body.caption
    });

    await newEvent.save();
    res.status(200).json("Event Created");
  } catch (err) {
    res.status(500).json(err);
  }
};

//get posts
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    return res.status(200).json({ msg: "Events found", events });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//like and dislike a post
const likeEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event.likes.includes(req.body.userId)) {
      await event.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Event has been liked");
    } else {
      await event.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Event has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createEvent = createEvent;
exports.getEvents = getEvents;
exports.likeEvent = likeEvent;
