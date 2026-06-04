const Community = require("../models/Community");
const JoinCommunity = require("../models/JoinCommunity");

const joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.user.id;

    // Check community exists
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }

    // Check if user already joined
    const alreadyJoined = await JoinCommunity.findOne({
      communityId,
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
      communityId,
      userId,
    });

    // Update member count
    const updatedCommunity = await Community.findByIdAndUpdate(
      communityId,
      {
        $inc: { membersCount: 0 },
      },
      { new: true }
    );

    // Actual members count from JoinCommunity collection
    const totalMembers = await JoinCommunity.countDocuments({
      communityId,
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