const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pledge = require("./Pledge");


const UserSchema = new Schema({
  pledges: [{ type: Schema.Types.ObjectId, ref: "Pledge" }],
  handle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
