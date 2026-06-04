// // models/Community.js

// import mongoose from "mongoose";

// const communitySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     membersCount: {
//       type: Number,
//       default: 0,
//     },
//         posts: 
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post",
//       },
    
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Community", communitySchema);

const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  membersCount: {
    type: Number,
    default: 0,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Community", communitySchema);