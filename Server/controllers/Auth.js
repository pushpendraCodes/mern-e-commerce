const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
let jwtkey = process.env.JWT_KEY;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendMail } = require("../services/common");



exports.CreateUser = async (req, res) => {
  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    let newUser = await new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    // check user email exist
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const token = jwt.sign(
        {
          user: user.email,
        },
        jwtkey
      );

      let verify_pass = await bcrypt.compare(req.body.password, user.password);
      !verify_pass && res.status(203).json("invalid credentials");

      res.status(200).json({
        user: user.id,
        token: token,
        role:user.role
      });
    } else {
      res.status(203).json("invalid credentials");
    }

    // verify password
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      "https://apnacart.vercel.app/reset-password?token=" + token + "&email=" + email;
    const subject = "reset password for e-commerce";
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

    // lets send email and a token in the mail body so we can verify that user has clicked right link

    if (email) {
      const response = await sendMail({ to: email, subject, html });
      // console.log(response,"response")
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   user.password = hashedPassword;

    await user.save();

    const subject = "password successfully reset for e-commerce";
    const html = `<p>Successfully able to Reset Password</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};
