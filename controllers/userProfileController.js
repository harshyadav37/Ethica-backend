// const UserProfile = require("../models/UserProfile");

// // ✅ Create Profile
// const createUserProfile = async (req, res) => {
//   try {
//     const {
//       fullName,
//       profileImage,
//       post,
//       location,
//       dateOfBirth,
//       websiteUrl,
//       university,
//       degree,
//       educationYear,
//       company,
//       position,
//       email,
//       aboutMe,
//       skills,
//     } = req.body;

//     const newProfile = new UserProfile({
//       fullName,
//       profileImage,
//       post,
//       location,
//       dateOfBirth,
//       websiteUrl,
//       university,
//       degree,
//       educationYear,
//       company,
//       position,
//       email,
//       aboutMe,
//       skills,
//     });

//     await newProfile.save();

//     res.status(200).json(newProfile);
//   } catch (error) {
//     res.status(400).json({
//       message: "Invalid data",
//       error: error.message,
//     });
//   }
// };

// // ✅ Get All Profiles
// const getUserProfile = async (req, res) => {
//   try {
//     const profiles = await UserProfile.find();
//     res.status(200).json(profiles);
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// // ✅ Update Profile
// const updateUserProfile = async (req, res) => {
//   try {
//     const {
//       fullName,
//       profileImage,
//       post,
//       location,
//       dateOfBirth,
//       websiteUrl,
//       university,
//       degree,
//       educationYear,
//       company,
//       position,
//       email,
//       aboutMe,
//       skills,
//     } = req.body;

//     const updatedProfile = await UserProfile.findByIdAndUpdate(
//       req.params.id,
//       {
//         fullName,
//         profileImage,
//         post,
//         location,
//         dateOfBirth,
//         websiteUrl,
//         university,
//         degree,
//         educationYear,
//         company,
//         position,
//         email,
//         aboutMe,
//         skills,
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     res.status(400).json({
//       message: "Update failed",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createUserProfile,
//   getUserProfile,
//   updateUserProfile,
// };



const UserProfile = require("../models/UserProfile");


// ✅ CREATE PROFILE
const createUserProfile = async (req, res) => {
  try {

    // ✅ Check existing profile
    const existingProfile = await UserProfile.findOne({
      user: req.user.id,
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const newProfile = new UserProfile({
      ...req.body,

      // ✅ Link profile to logged-in user
      user: req.user.id,
    });

    await newProfile.save();

    res.status(201).json(newProfile);

  } catch (error) {
    res.status(500).json({
      message: "Create profile failed",
      error: error.message,
    });
  }
};



// ✅ GET LOGGED-IN USER PROFILE ONLY
const getUserProfile = async (req, res) => {
  try {

    const profile = await UserProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({
      message: "Fetch profile failed",
      error: error.message,
    });
  }
};




// ✅ UPDATE LOGGED-IN USER PROFILE ONLY
const updateUserProfile = async (req, res) => {
  try {

    const updatedProfile = await UserProfile.findOneAndUpdate(
      {
        user: req.user.id,
      },

      {
        ...req.body,
      },

      {
        new: true,
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(updatedProfile);

  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};



module.exports = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
};