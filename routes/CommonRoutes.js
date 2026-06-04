
const express = require("express");

const router = express.Router();

const {createUserProfile, updateUserProfile, getUserProfile,} = require("../controllers/userProfileController");
const { createCommunity ,getCommunities } = require("../controllers/CommunityController");
const authMiddleware = require("../middlewares/commonMiddlewares");
const { joinCommunity ,leaveCommunity } = require("../controllers/JoinCommunity");
// ✅ Create Profile
router.post( "/createUserProfile", authMiddleware,  createUserProfile);

// ✅ Get Logged-in User Profile
router.get( "/getUserProfile",  authMiddleware,  getUserProfile);

// ✅ Update Logged-in User Profile
router.put(  "/updateUserProfile",  authMiddleware,  updateUserProfile);

// ✅ Create Community
router.post("/createCommunity", authMiddleware, createCommunity);

// ✅ Get All Communities
router.get("/getcommunities", authMiddleware, getCommunities);
// ✅ Join Community
router.post("/joinCommunity/:communityId", authMiddleware, joinCommunity);
// ✅ Leave Community
    router.delete("/leaveCommunity/:communityId", authMiddleware, leaveCommunity);

module.exports = router;