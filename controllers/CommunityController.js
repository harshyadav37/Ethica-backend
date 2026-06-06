import Community from "../models/Community.js";
import CommunityMember from "../models/JoinCommunity.js";

// Create Community
export const createCommunity = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCommunity = await Community.findOne({ name });

    if (existingCommunity) {
      return res.status(400).json({
        success: false,
        message: "Community already exists",
      });
    }

    const community = await Community.create({
      name,
      description,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Community created successfully",
      community,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Communities
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .sort({ createdAt: -1 });

    const communitiesWithMembers = await Promise.all(
      communities.map(async (community) => {
        const members = await CommunityMember.find({
          communityId: community._id,
        }).populate(
          "userId",
          "_id name profilePic"
        );

        return {
          ...community.toObject(),
          membersCount: members.length,

          members: members.map((member) => ({
            _id: member.userId?._id,
            name: member.userId?.name,
            profilePic: member.userId?.profilePic,
          })),
        };
      })
    );

    res.status(200).json({
      success: true,
      count: communitiesWithMembers.length,
      data: communitiesWithMembers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};