const express = require("express");
const { getAll } = require("../controllers/userControllers");
const checkName = require("../middlewares/checkName");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("router user");
});

// user ==> request ==> all users
router.get("/", getAll);

//create new User  ==> inscrit

router.post(
  "/register",
  check("email", "this field should be a valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    } else {
      next();
    }
  },
  async (req, res) => {
    const { email, password, role } = req.body;
    try {
      //req.body=={name:"xx",age...}
      //console.log(req.body)
      if (role == "admin" || role == "superAdmin") {
        return res.status(401).send({ msg: "unauthorized" });
      }
      const searchedUser = await User.findOne({ email });
      if (searchedUser) {
        return res
          .status(400)
          .send({ msg: "User already exisit, please log in" });
      }

      const newUser = new User(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;
      await newUser.save();
      res.send({ msg: "user added successfully", newUser });
    } catch (error) {
      console.log(error);
      res.end();
    }
  }
);

//log in user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).send({ msg: "incorrect email or password" });
    }
    const matched = await bcrypt.compare(password, existUser.password);
    if (!matched) {
      return res.status(400).send({ msg: "incorrect email or password" });
    }
    existUser.password = undefined;
    //console.log(existUser);
    const payload = { _id: existUser._id };
    const token = jwt.sign(payload, process.env.PRIVATEKEY);
    res.send({ user: existUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// delete user

router.delete("/:idDelete", async (req, res) => {
  try {
    const response = await User.deleteOne({ _id: req.params.idDelete });
    res.send({ msg: "user deleted successfully", response });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
