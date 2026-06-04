const CommunityMember = require("../models/JoinCommunity");

// Join Community
const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    const existingMember = await CommunityMember.findOne({
      communityId,
      userId,
    });

    if (existingMember) {
      const memberCount = await CommunityMember.countDocuments({
        communityId,
      });

      return res.status(200).json({
        success: true,
        message: "Already joined",
        joined: true,
        totalMembers: memberCount,
      });
    }

    const member = await CommunityMember.create({
      communityId,
      userId,
    });

    const memberCount = await CommunityMember.countDocuments({
      communityId,
    });

    return res.status(201).json({
      success: true,
      message: "Community joined successfully",
      joined: true,
      totalMembers: memberCount,
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Leave Community
const leaveCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    const existingMember = await CommunityMember.findOne({
      communityId,
      userId,
    });

    if (!existingMember) {
      const memberCount = await CommunityMember.countDocuments({
        communityId,
      });

      return res.status(404).json({
        success: false,
        message: "You are not a member of this community",
        joined: false,
        totalMembers: memberCount,
      });
    }

    await CommunityMember.findOneAndDelete({
      communityId,
      userId,
    });

    const memberCount = await CommunityMember.countDocuments({
      communityId,
    });

    return res.status(200).json({
      success: true,
      message: "Community left successfully",
      joined: false,
      totalMembers: memberCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  joinCommunity,
  leaveCommunity,
};