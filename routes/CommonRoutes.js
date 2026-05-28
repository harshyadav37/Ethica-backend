// const express = require("express");
// const router = express.Router();

// const {createUserProfile ,updateUserProfile ,getUserProfile} = require("../controllers/userProfileController")
// const authMiddleware = require("../middlewares/commonMiddlewares")




// router.post("/createUserProfile",authMiddleware, createUserProfile);
// router.get("/getUserProfile",authMiddleware, getUserProfile);
// router.put("/updateUserProfile/:id",authMiddleware,updateUserProfile);


// module.exports = router;


const express = require("express");

const router = express.Router();

const {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
} = require("../controllers/userProfileController");

const authMiddleware = require("../middlewares/commonMiddlewares");



// ✅ Create Profile
router.post(
  "/createUserProfile",
  authMiddleware,
  createUserProfile
);



// ✅ Get Logged-in User Profile
router.get(
  "/getUserProfile",
  authMiddleware,
  getUserProfile
);



// ✅ Update Logged-in User Profile
router.put(
  "/updateUserProfile",
  authMiddleware,
  updateUserProfile
);



module.exports = router;