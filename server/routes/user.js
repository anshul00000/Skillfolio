const express = require('express');
const router = express.Router();
const User = require('../models/user_model.js');
const Project_schema = require("../models/projects_model");
const { user_details, all_user_details } = require('../middlewares/user_details');
const multer = require("multer");
const axios = require("axios");
const FormData = require('form-data');

const upload = multer({ storage: multer.memoryStorage() });
const IMGBB_API_KEY = process.env.IMGBB_API_KEY || "da1525012fc530ebe43bac497e762627";

//  *********************************
//  ****   follow   user ******
//  *********************************

router.post('/follow', user_details, async (req, res) => {
  try {
    const { my_id, user_id } = req.body;

    if (!my_id || !user_id) {
      return res.status(400).json({ error: "my_id and user_id are required." });
    }

    const project = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { following: my_id } },
      { new: true }
    );

    const project2 = await User.findByIdAndUpdate(
      my_id,
      { $addToSet: { followers: user_id } },
      { new: true }
    );

    if (!project) {
      console.log("user not found");
      res.json('user not found');
    } else {
      res.json({ message: "update details sussefully ", updatedproject: project });
    }
  } catch (error) {
    console.error("Error in follow route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  *********************************
//  **** check  follow   user ******
//  *********************************

router.post('/checkfollow', user_details, async (req, res) => {
  try {
    const user_tooken = req.user;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required." });
    }

    const populatedUser = await User.findById(user_tooken._id)
      .populate('followers', '_id')
      .populate('following', '_id');

    const isUserInFollowersOrFollowing = (user, targetUserId) => {
      const isFollower = user.followers.some(follower => follower._id.toString() === targetUserId);
      const isFollowing = user.following.some(following => following._id.toString() === targetUserId);
      return { isFollower, isFollowing };
    };

    const { isFollower, isFollowing } = isUserInFollowersOrFollowing(populatedUser, user_id);

    return res.json({ isFollower, isFollowing });
  } catch (error) {
    console.error("Error in checkfollow route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  *********************************
//  ****   unfollow  user ******
//  *********************************

router.post('/unfollow', user_details, async (req, res) => {
  try {
    const { my_id, user_id } = req.body;

    if (!my_id || !user_id) {
      return res.status(400).json({ error: "my_id and user_id are required." });
    }

    const project = await User.findByIdAndUpdate(
      my_id,
      { $pull: { followers: user_id } },
      { new: true }
    );

    const project2 = await User.findByIdAndUpdate(
      user_id,
      { $pull: { following: my_id } },
      { new: true }
    );

    res.json({ message: "unfollow user sussefully ", updatedproject: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//  *********************************
//  ****   get  user ******
//  *********************************

router.post('/auser', async (req, res) => {
  const { user_id } = req.body;

  try {
    const user_deails = await User.findOne({ _id: user_id }).select({ password: 0, }).populate('followers', '-password').populate('following', '-password');
    const project_details = await Project_schema.find({ owner: user_id })
      .populate('owner')
      .populate('comments.user', 'username photo email');

    res.json({ user_deails, project_details });
  } catch (error) {
    return res.json({ msg: "not find error " });
  }
});

//  *********************************
//  ****  user route  ******
//  *********************************

router.get('/user', user_details, (req, res) => {
  const user_tooken = req.user;
  const project_data = req.project;

  res.json({ user_tooken, project_data });
});

//  *********************************
//  ****  all user route  ******
//  *********************************

router.get('/users', all_user_details, (req, res) => {
  const users = req.user;
  res.json({ users });
});

//  ***********************************
//  ****   user update route  ******
//  *********************************** 

function safeJsonParse(value) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'object') return value;
  if (typeof value !== 'string') return undefined;
  try {
    return JSON.parse(value);
  } catch (e) {
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }
}

function normalizeEducationArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    type: item.type || 'college',
    institution: item.institution || '',
    degree: item.degree || '',
    fieldOfStudy: item.fieldOfStudy || '',
    startYear: item.startYear ? Number(item.startYear) : undefined,
    endYear: item.endYear ? Number(item.endYear) : undefined,
    description: item.description || ''
  }));
}

function normalizeExperienceArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    company: item.company || '',
    role: item.role || '',
    location: item.location || '',
    startDate: item.startDate ? new Date(item.startDate) : undefined,
    endDate: item.endDate ? new Date(item.endDate) : undefined,
    currentlyWorking: !!item.currentlyWorking,
    description: item.description || ''
  }));
}

function normalizeCertificationsArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => ({
    title: item.title || '',
    issuer: item.issuer || '',
    issueDate: item.issueDate ? new Date(item.issueDate) : undefined,
    credentialUrl: item.credentialUrl || ''
  }));
}

router.patch('/updateuser/:id', user_details, upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;

    const {
      username,
      bio,
      github,
      linkedin,
      role,
      website,
      resumeUrl,
      location,
      isFresher
    } = req.body;

    const educationRaw = safeJsonParse(req.body.education);
    const experienceRaw = safeJsonParse(req.body.experience);
    const certificationsRaw = safeJsonParse(req.body.certifications);
    const skillsRaw = safeJsonParse(req.body.skills);

    const education = educationRaw ? normalizeEducationArray(educationRaw) : undefined;
    const experience = experienceRaw ? normalizeExperienceArray(experienceRaw) : undefined;
    const certifications = certificationsRaw ? normalizeCertificationsArray(certificationsRaw) : undefined;
    const skills = Array.isArray(skillsRaw) ? skillsRaw.map(s => String(s)) : (typeof skillsRaw === 'string' ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : undefined);

    const updateObj = {};
    if (typeof username !== 'undefined') updateObj.username = username;
    if (typeof bio !== 'undefined') updateObj.bio = bio;
    if (typeof github !== 'undefined') updateObj.github = github;
    if (typeof linkedin !== 'undefined') updateObj.linkedin = linkedin;
    if (typeof role !== 'undefined') updateObj.role = role;
    if (typeof website !== 'undefined') updateObj.website = website;
    if (typeof resumeUrl !== 'undefined') updateObj.resumeUrl = resumeUrl;
    if (typeof location !== 'undefined') updateObj.location = location;
    if (typeof isFresher !== 'undefined') updateObj.isFresher = isFresher;
    if (typeof education !== 'undefined') updateObj.education = education;
    if (typeof experience !== 'undefined') updateObj.experience = experience;
    if (typeof certifications !== 'undefined') updateObj.certifications = certifications;
    if (typeof skills !== 'undefined') updateObj.skills = skills;

    if (!req.file) {
      const updated = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'Details updated successfully', user: updated });
    }

    const fileBuffer = req.file.buffer;
    if (!fileBuffer) {
      const updated = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'Details updated (image missing)', user: updated });
    }

    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', fileBuffer.toString('base64'));

    const imgbbResp = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders ? formData.getHeaders() : { 'Content-Type': 'multipart/form-data' },
      maxBodyLength: Infinity
    });

    const imageUrl = imgbbResp?.data?.data?.url;
    if (imageUrl) updateObj.photo = imageUrl;

    const updatedUser = await User.findByIdAndUpdate(id, updateObj, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'Details and image updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: "Couldn't update user", error: error.message || error });
  }
});

module.exports = router;
