const mongoose = require("mongoose");

const communityMemberSchema = new mongoose.Schema(
  {
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can join a community only once
communityMemberSchema.index(
  { communityId: 1, userId: 1 },
  { unique: true }
);

// Ensure you're exporting with the correct model name
module.exports = mongoose.model("CommunityMember", communityMemberSchema);