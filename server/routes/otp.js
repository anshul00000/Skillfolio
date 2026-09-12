const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user_model.js');

// Store OTP in memory (For production, use a database)
const otpStore = {};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "anshulemailid07@gmail.com",
    pass: "gqmbctdyzizkvlzm",
    
  },
});

//  *********************************
//  ****  otp route  ******
//  *********************************

// Route to send OTP
router.post('/sendotp', async (req, res) => {
  const { email, forget } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required', status: 400 });

  if (forget) {
    const userexist = await User.findOne({ email });

    if (userexist) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = otp;
      setTimeout(() => delete otpStore[email], 5 * 60 * 1000);

      const mailOptions = {
        from: "anshulemailid07@gmail.com",
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email', status: 200 });
      } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', status: 500, error });
      }
    } else {
      return res.status(400).json({ message: 'email is not found', status: 400 });
    }
  } else {
    const userexist = await User.findOne({ email });

    if (userexist) {
      return res.status(400).json({ message: 'email alwrad exist try again another one ', status: 400 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);

    const mailOptions = {
      from: "anshulemailid07@gmail.com",
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'OTP sent to your email', status: 200 });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP', status: 500, error });
    }
  }
});

// Route to verify OTP
router.post('/verifyotp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully', status: 200 });
  } else {
    res.status(400).json({ message: `Invalid OTP or OTP expired`, status: 400 });
  }
});

module.exports = router;
