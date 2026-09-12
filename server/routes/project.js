const express = require('express');
const router = express.Router();
const Project_schema = require("../models/projects_model");
const User = require('../models/user_model.js');
const { user_details } = require('../middlewares/user_details');
const all_project = require('../middlewares/all_project');
const multer = require("multer");
const axios = require("axios");
const FormData = require('form-data');

const upload = multer({ storage: multer.memoryStorage() });
const IMGBB_API_KEY = process.env.IMGBB_API_KEY || "da1525012fc530ebe43bac497e762627";

//  *********************************
//  ****   all project route  ******
//  *********************************

router.get('/allproject', all_project, (req, res) => {
  const all_project_data = req.project;
  res.json({ all_project_data });
});

//  *********************************
//  ****   file route  ******
//  *********************************

router.post('/file', upload.single('image'), async (req, res) => {
  const image = req.file;
  const { name, description, technologys, github_link, online_link, owner } = req.body;

  if (name === "" && description === "" && technologys === "" && github_link === "") {
    res.json({ message: "Name , Description , Technologys , github_link Important Pleae filup these feeldes" });
  } else {
    if (!image) {
      const response = await Project_schema.create({ name, description, technologys, github_link, online_link, owner });
      res.json(response);
    } else {
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", req.file.buffer.toString("base64"));

      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: formData.getHeaders ? formData.getHeaders() : { "Content-Type": "multipart/form-data" },
        maxBodyLength: Infinity
      });

      const image_name = response.data.data.url;
      const response2 = await Project_schema.create({ name, description, technologys, github_link, online_link, image: image_name, owner });

      res.json(response2);
    }
  }
});

//  ***********************************
//  ****   Project update route  ******
//  *********************************** 

router.patch('/updateproject/:id', user_details, upload.single('image'), async (req, res) => {
  try {
    const image = req.file;
    const id = req.params.id;
    const { name, description, technologys, github_link, online_link } = req.body;
    
    if (!image) {
      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, github_link, online_link }, { new: true });
      if (!project) {
        console.log("Project not found");
        res.json('Project not found');
      } else {
        res.json({ message: "update project sussefully ", updatedproject: project });
      }
    } else {
      const formData = new FormData();
      formData.append("key", IMGBB_API_KEY);
      formData.append("image", req.file.buffer.toString("base64"));

      const imgresponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: formData.getHeaders ? formData.getHeaders() : { "Content-Type": "multipart/form-data" },
        maxBodyLength: Infinity
      });

      const image_name = imgresponse.data.data.url;
      const project = await Project_schema.findByIdAndUpdate(id, { name, description, technologys, image: image_name }, { new: true });

      if (!project) {
        console.log("Project not found");
        res.json('Project not found');
      } else {
        res.json({ message: "update project sussefully ", updatedproject: project });
      }
    }
  } catch (error) {
    res.json({ message: " Couldn't update project", gadbad: error });
  }
});

//  ***********************************
//  ****   Project delete route  ******
//  *********************************** 

router.delete('/deletefile/:id/image/:image', async (req, res) => {
  const project_id = req.params.id;

  try {
    await Project_schema.deleteOne({ _id: project_id });
    res.send({ message: `project delete completly` });
  } catch (error) {
    res.json({ message: `Error deleting error is ${error}` });
  }
});

//  ***********************************
//  ****   Save Project route  ******
//  *********************************** 

router.post('/saveproject', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ error: "project_id is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user_token._id,
      { $addToSet: { savedProjects: project_id } },
      { new: true }
    );

    const updatedProject = await Project_schema.findByIdAndUpdate(
      project_id,
      { $addToSet: { savedBy: user_token._id } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project saved successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in save project route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Unsave Project route  ******
//  *********************************** 

router.post('/unsaveproject', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ error: "project_id is required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user_token._id,
      { $pull: { savedProjects: project_id } },
      { new: true }
    );

    const updatedProject = await Project_schema.findByIdAndUpdate(
      project_id,
      { $pull: { savedBy: user_token._id } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project unsaved successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in unsave project route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Like Project route  ******
//  *********************************** 

router.post('/likeproject', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ error: "project_id is required." });
    }

    const updatedProject = await Project_schema.findByIdAndUpdate(
      project_id,
      { $addToSet: { likes: user_token._id } },
      { new: true }
    ).populate('likes', 'username photo');

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project liked successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in like project route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Unlike Project route  ******
//  *********************************** 

router.post('/unlikeproject', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id } = req.body;

    if (!project_id) {
      return res.status(400).json({ error: "project_id is required." });
    }

    const updatedProject = await Project_schema.findByIdAndUpdate(
      project_id,
      { $pull: { likes: user_token._id } },
      { new: true }
    ).populate('likes', 'username photo');

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project unliked successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in unlike project route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Add Comment route  ******
//  *********************************** 

router.post('/addcomment', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id, text } = req.body;

    if (!project_id || !text) {
      return res.status(400).json({ error: "project_id and text are required." });
    }

    const newComment = {
      user: user_token._id,
      text: text,
      createdAt: new Date()
    };

    const updatedProject = await Project_schema.findByIdAndUpdate(
      project_id,
      { $push: { comments: newComment } },
      { new: true }
    ).populate('comments.user', 'username photo');

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Comment added successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in add comment route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Delete Comment route  ******
//  *********************************** 

router.post('/deletecomment', user_details, async (req, res) => {
  try {
    const user_token = req.user;
    const { project_id, comment_id } = req.body;

    if (!project_id || !comment_id) {
      return res.status(400).json({ error: "project_id and comment_id are required." });
    }

    const project = await Project_schema.findById(project_id);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const comment = project.comments.id(comment_id);
    
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user.toString() !== user_token._id.toString() && 
        project.owner.toString() !== user_token._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    project.comments.pull(comment_id);
    await project.save();

    const updatedProject = await Project_schema.findById(project_id)
      .populate('comments.user', 'username photo');

    res.json({ message: "Comment deleted successfully", project: updatedProject });
  } catch (error) {
    console.error("Error in delete comment route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  ***********************************
//  ****   Get Saved Projects route  ******
//  *********************************** 

router.get('/savedprojects', user_details, async (req, res) => {
  try {
    const user_token = req.user;

    const user = await User.findById(user_token._id)
      .populate({
        path: 'savedProjects',
        populate: { path: 'owner', select: 'username photo' }
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ savedProjects: user.savedProjects });
  } catch (error) {
    console.error("Error in get saved projects route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
