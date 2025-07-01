var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // fallback to "user" if req.body.username not available yet
    const base = req.body.username || "user";
    cb(null, `${base}${ext}`);
  },
});
const upload = multer({ storage: storage });

/* Users API */
// getAll
router.get("/", async function (req, res, next) {
  // res.send('method get');
  try {
    let users = await userModel.find();
    return res.status(200).send({
      data: users,
      message: "Users retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

//getByID
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // Optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user ID",
        success: false,
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).send({
      data: user,
      message: "User retrieved successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

// create
router.post("/", upload.single("picture"), async function (req, res, next) {
  // res.send('method post');
  try {
    const { username, password, firstName, lastName, age, gender, role } =
      req.body;
    // hash password
    const hashed_pass = await bcrypt.hash(password, 12);
    let newUser = new userModel({
      username: username,
      password: hashed_pass,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      role: role,
    });

    // multer woker
    if (req.file) {
      newUser.picture = "/uploads/profiles/" + req.file.filename;
    }

    let user = await newUser.save();
    return res.status(201).send({
      data: user,
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error creating user " + err,
      success: false,
    });
  }
});

// update
router.put("/:id", upload.single("picture"), async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }

    // If password is present, hash it
    if (req.body.password) {
      const hashed_pass = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashed_pass;
    }

    // If a file is uploaded, add picture path to req.body
    if (req.file) {
      req.body.picture = "/" + req.file.path.replace(/\\/g, "/"); // normalize for URL usage
    }

    // Update user
    await userModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );

    const user = await userModel.findById(id);
    return res.status(201).send({
      data: user,
      message: "User updated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

// delete
router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }

    // Find the user first
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // Build the picture path based on username and .jpg extension
    const picturePath = path.join(
      __dirname,
      "..",
      "uploads",
      "profiles",
      `${user.username}.jpg`
    );

    // Delete picture file if it exists
    try {
      if (fs.existsSync(picturePath)) {
        await unlinkAsync(picturePath);
      }
    } catch (err) {
      console.error("Error deleting profile picture file:", err);
    }

    // Delete the user document
    await userModel.deleteOne({ _id: id });

    let users = await userModel.find();
    return res.status(200).send({
      data: users,
      message: "User and profile picture deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

// Make sure your app serves the uploaded files (do this in your app.js or main file)
router.use("/uploads", express.static("uploads"));
module.exports = router;
