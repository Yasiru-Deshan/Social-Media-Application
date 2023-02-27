const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    caption: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
