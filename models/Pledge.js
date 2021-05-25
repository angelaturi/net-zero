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
  //   address: {
  //     type: String,
  //     required: true,
  //   },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,

  //   image: {
  //     type: String,
  //     required: false,
  //   },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pledge = mongoose.model("pledges", PledgeSchema);
