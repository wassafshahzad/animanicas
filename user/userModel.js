const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("config");
const schema = require("./userSchemaValidator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 457,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 457,
    unique: true,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
    default: "Hi all i ts me ",
  },
  profile_pic: {
    type: String,
    minlength: 3,
    maxlength: 255,
    default: " I have no profile pic",
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

UserSchema.methods.isValidatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, config.get("salt"));
  next();
});

function validateUser(user) {
  return schema.validate(user);
}

let User = mongoose.model("user", UserSchema);

(exports.User = User), (exports.validateUser = validateUser);
