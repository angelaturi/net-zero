const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PledgeSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "users" },

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
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  follows: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      count: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pledge = mongoose.model("pledges", PledgeSchema);
