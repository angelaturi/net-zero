const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const PledgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },

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
  follows: [{ type: Schema.Types.ObjectId, ref: "users" }],
  
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
    required: true,
  },
});

module.exports = Pledge = mongoose.model("pledges", PledgeSchema);
