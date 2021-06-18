const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = require("./User");

const PledgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionlist: {
    type: Array,
  },
  public: {
    type: Boolean,
    required: true,
    default: true,
  },
  comments: [
    {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      authorName: {
        type: String,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  image: {
    type: String,
    required: false,
  },
  follows: [{ type: Schema.Types.ObjectId, ref: "User" }],

  state: {
    type: String,
    required: true,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
  },
});

module.exports = Pledge = mongoose.model("Pledge", PledgeSchema);


