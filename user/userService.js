const { User, validateUser } = require("./userModel");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  getAllUsers() {
    let user = this.userModel.find({}).lean();
    return user;
  }

  getUserById(id) {
    return this.userModel.find({ _id: id });
  }

  async login({ email, password }) {
    const user = await this.getUserByEmail(email);
    let isValid = await user.isValidatePassword(password);
    if (isValid) {
      return user;
    } else {
      throw new Error("Enter Valid Credentials");
    }
  }

  getUserByEmail(email) {
    let user = this.userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Content not available");
    }
    return user;
  }

  async createUser(body) {
    body = this._validateBody(body);
    await this._doesUserExist(body.email);
    let user = new User({
      name: body.name,
      password: body.password,
      email: body.email,
    });
    user.save();
    return user;
  }

  _validateBody(data) {
    const { error } = validateUser(data);
    this._raiseError(error);
    return data;
  }

  async _doesUserExist(email) {
    let user = await this.getUserByEmail(email);
    if (user) {
      this._raiseError(new Error("User already exist"));
    }
  }

  _raiseError(error) {
    if (error) {
      throw error;
    }
    return;
  }
}

module.exports = new UserService(User);
