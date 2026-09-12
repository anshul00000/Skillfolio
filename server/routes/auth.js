const express = require('express');
const router = express.Router();
const User = require('../models/user_model.js');
const bcrypt = require('bcrypt');
const { signupschema, loginschema } = require("../models/Model_validation");
const { validate } = require("../middlewares/validater_middleware_");

//  *********************************
//  ****   register route  ******
//  *********************************
router.post('/register', validate(signupschema), async (req, res) => {
  const { username, email, password, phone } = req.body;
  const userexist = await User.findOne({ email });
  if (userexist) {
    return res.status(400).json({ msg: "email alwrad exist in database" });
  } else {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const created_user = await User.create({ username, email, password: hash, phone });
      console.log("upload ho gai this is server side ☺️");
      res.json({ msg: "user created sussesfully ✔️✅", tooken: await created_user.generateToken(), userId: created_user._id.toString() });
    });
  }
});
//  *********************************
//  ****   login route  ******
//  *********************************
router.post('/login', validate(loginschema), async (req, res) => {
  const { email, password } = req.body;
  const userexist = await User.findOne({ email });

  if (userexist) {
    const result = await userexist.password_compar(password);

    if (result) {
      res.json({ msg: "login succesfully ✔️", tooken: await userexist.generateToken(), userId: userexist._id.toString() });
    } else {
      res.json({ msg: "❌ invlid email or password ❌" });
    }
  } else {
    res.json({ msg: "invalid email or password / not found" });
  }
});

//  *********************************
//  **** forget route  ******
//  *********************************

router.post('/forget', async (req, res) => {
  const { email, password } = req.body;

  if (password === "") {
    const userexist = await User.findOne({ email });

    if (userexist) {
      res.json(true);
    } else {
      res.json(false);
    }
  } else {
    try {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        await User.updateOne(
          { email: email },
          { $set: { password: hash } }
        );
        console.log("upload ho gai this is server side ☺️");
        res.json(true);
      });
    } catch (error) {
      res.json(false);
    }
  }
});

module.exports = router;
