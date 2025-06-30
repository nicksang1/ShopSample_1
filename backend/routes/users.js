var express = require("express");
const userModel = require("../models/user");
var router = express.Router();
const mongoose = require("mongoose");
bcrypt = require("bcrypt");

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
router.post("/", async function (req, res, next) {
  // res.send('method post');
  try {
    const { username, password, firstName, lastName, age, gender } = req.body;
    // hash password
    const hashed_pass = await bcrypt.hash(password, 12);
    let newUser = new userModel({
      username: username,
      password: hashed_pass,
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
    });
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
router.put("/:id", async function (req, res, next) {
  // res.send('method put');
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }

    // Check if password is in the request body
    if (req.body.password) {
      const hashed_pass = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashed_pass;
    }

    await userModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );
    let user = await userModel.findById(id);
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
  // res.send("method delete");
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid user id",
        success: false,
        erro: ["id is not a Obj"],
      });
    }
    await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    let user = await userModel.find();
    return res.status(200).send({
      data: user,
      message: "Delete User Success",
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Server error " + err,
      success: false,
    });
  }
});

module.exports = router;
