import Follow from "../models/Follow.js";

export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.params;

    if (followerId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const existing = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already following",
      });
    }

    await Follow.create({
      follower: followerId,
      following: userId,
    });

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.params;

    await Follow.findOneAndDelete({
      follower: followerId,
      following: userId,
    });

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// followers count
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({
      following: userId,
    }).populate(
      "follower",
      "_id name profileImage"
    );

    res.status(200).json({
      success: true,
      count: followers.length,
      data: followers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// following count
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Requested Following UserId:", userId);

    const following = await Follow.find({
      follower: userId,
    }).populate(
      "following",
      "_id name profileImage"
    );

    console.log(
      "Following Count:",
      following.length
    );

    console.log(
      "Following Data:",
      JSON.stringify(following, null, 2)
    );

    return res.status(200).json({
      success: true,
      count: following.length,
      data: following,
    });
  } catch (error) {
    console.log(
      "Get Following Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};