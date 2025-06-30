var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const mongoose = require("mongoose");
bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required." });
  }

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    // During login (compare)
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      /* handle invalid password */
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1d", // Valid durations
      }
    );

    // If valid, return success and some user data (omit password)
    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
