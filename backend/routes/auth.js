const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = require("../middleware/getUser");

const JWT_SECRET = "Dhairya#is#a#good#boy";

// Route 1. Create a user using POST "/api/auth/createuser". Doesn't require Auth.
router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        console.log("user", user);
        return res
          .status(404)
          .json({ error: "User with this email already exists!" });
      } else {
        // Hashing the password.
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
        });

        const data = {
          user: { id: user.id },
        };
        console.log('user.id', user.id)
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken: authToken });
      }
    } catch (error) {
      console.log("error.message", error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 2. Authenticate a Login attempt from a User using POST "/api/auth/login".
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errs = validationResult(req);
    let success = false;

    if (!errs.isEmpty()) {
      return res.status(400).json({ success, errors: errs });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ success, error: "Incorrect credentials!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ success, error: "Incorrect credentials!" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, name: user.name, authToken: authToken });
    } catch (error) {
      console.log("error.message", error.message);
      res.status(500).send("Internal Server Error occured.");
    }
  }
);

// Route 3. POST: Get Logged in user details using : POST "/api/auth/getuser". Login required.
router.post("/getuser", getUser, async (req, res) => {
  let userid = req.user.id;

  try {
    const user = await User.findById(userid).select("-password");
    // res.json({username: user.name});
    res.send(user);
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send("Internal Server Error occured.");
  }
});

module.exports = router;
