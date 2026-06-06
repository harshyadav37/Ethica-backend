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
      ref: "SOCIAL",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek user ek hi community ko ek baar join kar sake
communityMemberSchema.index(
  { communityId: 0, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "CommunityMember",
  communityMemberSchema
);