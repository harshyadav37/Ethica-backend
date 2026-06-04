const mongoose = require("mongoose");
const Community = require("../models/Community");
const JoinCommunity = require("../models/JoinCommunity");

const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    let community;
    let actualCommunityId;

    // Check if the ID is a valid MongoDB ObjectId (24 hex chars)
    const isValidObjectId = mongoose.Types.ObjectId.isValid(communityId) && 
                           /^[0-9a-fA-F]{24}$/.test(communityId);

    if (isValidObjectId) {
      // It's a valid MongoDB ObjectId, search by _id
      community = await Community.findById(communityId);
      if (community) {
        actualCommunityId = community._id;
      }
    } else {
      // It's not a valid ObjectId (like 'local-17'), search by slug or custom field
      // Try to find by slug first
      community = await Community.findOne({ slug: communityId });
      
      // If not found by slug, try to find by name (case-insensitive)
      if (!community) {
        community = await Community.findOne({ 
          name: { $regex: new RegExp(`^${communityId}$`, 'i') } 
        });
      }
      
      if (community) {
        actualCommunityId = community._id;
      }
    }

    // Check community exists
    if (!community) {
      return res.status(404).json({
        success: false,
        message: `Community not found with identifier: ${communityId}`,
      });
    }

    // Check if user already joined using the actual MongoDB ObjectId
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

    // Add member with actual MongoDB ObjectId
    await JoinCommunity.create({
      communityId: actualCommunityId,
      userId,
    });

    // Update member count (fixed: increment by 1 instead of 0)
    const updatedCommunity = await Community.findByIdAndUpdate(
      actualCommunityId,
      {
        $inc: { membersCount: 1 },
      },
      { new: true }
    );

    // Actual members count from JoinCommunity collection
    const totalMembers = await JoinCommunity.countDocuments({
      communityId: actualCommunityId,
    });

    return res.status(200).json({
      success: true,
      message: "Community joined successfully",
      communityId: updatedCommunity._id,
      communityName: updatedCommunity.name,
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