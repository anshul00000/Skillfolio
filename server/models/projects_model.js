const mongoose = require('mongoose');

// Comment sub-schema
const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const project_schema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },
   
    technologys: { type: String, required: true },
   
    github_link: { type: String, required: true },
   
    online_link: { type: String },
  
    image : { type: String, default : "default.jpg"},

    owner : { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
        required: true },
    
    // Users who liked this project
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    // Users who saved this project
    savedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    // Comments on this project
    comments: [CommentSchema]

  },{ timestamps: true });

const project = new mongoose.model("project" , project_schema) ; 

module.exports = project ; 