const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validatePledgeInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.description = validText(data.description) ? data.description : "";

  // data.address = validText(data.address) ? data.address : "";
  // data.state = validText(data.state) ? data.state : "";
  // data.city = validText(data.city) ? data.city : "";
  // data.ownerId = validText(data.ownerId) ? data.ownerId : "";

  // if (Validator.isEmpty(data.ownerId)) {
  //   errors.user = "Owner id required.";
  // }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }

  if (!Validator.isLength(data.title, { min: 4, max: 20 })) {
    errors.title =
      "Title field should be minimum 4 characters and maximum 20 characters.";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required.";
  }

  if (!Validator.isLength(data.description, { min: 8, max: 100 })) {
    errors.description =
      "Description field should be minimum 8 characters and maximum 100 characters.";
  }

  // if (Validator.isEmpty(data.state)) {
  //   errors.state = "State field is required.";
  // }

  // if (Validator.isEmpty(data.address)) {
  //   errors.address = "Address code field is required.";
  // }

  // if (Validator.isEmpty(data.city)) {
  //   errors.city = "City code field is required.";
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
