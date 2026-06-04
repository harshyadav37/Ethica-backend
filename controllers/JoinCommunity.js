const mongoose = require("mongoose");
const Community = require("../models/Community");
const JoinCommunity = require("../models/JoinCommunity");

const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    let community;
    let actualCommunityId;

    // Method 1: Check if it's a valid MongoDB ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(communityId) && /^[0-9a-fA-F]{24}$/.test(communityId);
    
    if (isValidObjectId) {
      community = await Community.findById(communityId);
    }
    
    // Method 2: Try to find by slug field
    if (!community) {
      community = await Community.findOne({ slug: communityId });
    }
    
    // Method 3: Try to find by exact name match (case-insensitive)
    if (!community) {
      community = await Community.findOne({ 
        name: { $regex: new RegExp(`^${communityId}$`, 'i') } 
      });
    }
    
    // Method 4: Try to find by partial name match
    if (!community) {
      community = await Community.findOne({ 
        name: { $regex: communityId, $options: 'i' } 
      });
    }
    
    // Method 5: If communityId is a number, try to find by communityNumber field
    if (!community && !isNaN(communityId)) {
      community = await Community.findOne({ 
        communityNumber: parseInt(communityId) 
      });
    }

    if (!community) {
      return res.status(404).json({
        success: false,
        message: `Community not found with identifier: ${communityId}`,
      });
    }

    actualCommunityId = community._id;

    // Check if user already joined
    const alreadyJoined = await JoinCommunity.findOne({
      communityId: actualCommunityId,
      userId,
    });

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "Already joined this community",
      });
    }

    // Add member
    await JoinCommunity.create({
      communityId: actualCommunityId,
      userId,
    });

    // Update member count (FIX: change from 0 to 1)
    await Community.findByIdAndUpdate(
      actualCommunityId,
      { $inc: { membersCount: 1 } }
    );

    const totalMembers = await JoinCommunity.countDocuments({
      communityId: actualCommunityId,
    });

    return res.status(200).json({
      success: true,
      message: "Community joined successfully",
      communityId: community._id,
      communityName: community.name,
      membersCount: totalMembers,
    });

  } catch (error) {
    console.error("Join Community Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { joinCommunity };