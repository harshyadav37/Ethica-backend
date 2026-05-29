
const express = require("express");

const router = express.Router();

const {createUserProfile, updateUserProfile, getUserProfile,} = require("../controllers/userProfileController");
const { createCommunity } = require("../controllers/CommunityController");
const authMiddleware = require("../middlewares/commonMiddlewares");

// ✅ Create Profile
router.post( "/createUserProfile", authMiddleware,  createUserProfile);

// ✅ Get Logged-in User Profile
router.get( "/getUserProfile",  authMiddleware,  getUserProfile);

// ✅ Update Logged-in User Profile
router.put(  "/updateUserProfile",  authMiddleware,  updateUserProfile);

// ✅ Create Community
router.post("/createCommunity", authMiddleware, createCommunity);


module.exports = router;