const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const Signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = HashedPassword;
    req.body.role = "67c1d766244df2991d6959b0";
    const CreateUser = await UserModel.create(req.body);
    res.send(CreateUser);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ email: email }).populate("role");
    if (!user) {
      return res.send({ message: "Invalid Email" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send({ message: "Invalid Password" });
    }
    res.send({ message: "Login Success", data: user });
    }
  } catch (error) {
    res.send({ message: error });
  }
};

module.exports = {
  Signup,
  Login,
};
