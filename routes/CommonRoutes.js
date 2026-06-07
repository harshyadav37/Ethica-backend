
const express = require("express");

const router = express.Router();

const {createUserProfile, updateUserProfile, getUserProfile,} = require("../controllers/userProfileController");
const { createCommunity ,getCommunities } = require("../controllers/CommunityController");
const authMiddleware = require("../middlewares/commonMiddlewares");
const { joinCommunity ,leaveCommunity } = require("../controllers/JoinCommunity");
const { followUser, unfollowUser ,getFollowers ,getFollowing } = require("../controllers/FollowController");
const {  createConversation,  sendMessage,  getMessages,  getConversations,} =require( "../controllers/MessageController");
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

    // ✅ Follow User
router.post("/follow/:userId", authMiddleware, followUser);
// ✅ Unfollow User
router.delete("/unfollow/:userId", authMiddleware, unfollowUser);
// ✅ Get Followers
router.get("/followers/:userId", authMiddleware, getFollowers);
// ✅ Get Following
router.get("/following/:userId", authMiddleware, getFollowing);
// conversation 

router.post("/conversation",authMiddleware,createConversation);

// sendMessage
router.post("/sendMessage" , authMiddleware,sendMessage);
// getMessage
router.get( "/getMessage/:conversationId", authMiddleware,getMessages);

// get conversation 
router.get("/getConversation", authMiddleware, getConversations)
module.exports = router;