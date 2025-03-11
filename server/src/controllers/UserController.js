const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const mailUtil = require("../utils/MailUtil.js")

const Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    let errors = [];

    // Check for empty fields
    if (!firstName)
      errors.push({ param: "firstName", msg: "First name is required" });
    if (!lastName)
      errors.push({ param: "lastName", msg: "Last name is required" });
    if (!email) errors.push({ param: "email", msg: "Email is required" });
    if (!password)
      errors.push({ param: "password", msg: "Password is required" });
    if (!confirmPassword)
      errors.push({
        param: "confirmPassword",
        msg: "Confirm password is required",
      });

    if (errors.length > 0) return res.status(400).json({ errors });

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          errors: [
            {
              param: "password",
              msg: "Password must be at least 8 characters",
            },
          ],
        });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({
          errors: [{ param: "confirmPassword", msg: "Passwords do not match" }],
        });
    }

    // Check if email already exists
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ errors: [{ param: "email", msg: "Email already exists" }] });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "67c1d766244df2991d6959b0",
    });

    // Mail Response
    await mailUtil.sendingMail(newUser.email, "Welcome to Expense Tracker", "See to Happy")

    return res
      .status(201)
      .json({ message: "Signup successful", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await UserModel.findOne({ email }).populate("role");
  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  res.status(200).json({ message: "Login Success", user: user });
};

module.exports = {
  Signup,
  Login,
};
