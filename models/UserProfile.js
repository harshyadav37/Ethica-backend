// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const UserProfileSchema = new Schema(
//   {
//     fullName: {
//       type: String,
     
//       trim: true,
//     },

//     profileImage: {
//       type: String, // store image URL or path
//       default: "",
//     },

//     post: {
//       type: String, // title / designation
//       trim: true,
//     },

//     location: {
//       type: String,
//       trim: true,
//     },

//     dateOfBirth: {
//       type: Date,
//     },

//     websiteUrl: {
//       type: String,
//       trim: true,
//       validate: {
//         validator: function (v) {
//           return /^https?:\/\/.+\..+/.test(v);
//         },
//         message: "Invalid website URL",
//       },
//     },

//     university: {
//       type: String,
//       trim: true,
//     },

//     degree: {
//       type: String,
//       trim: true,
//     },

//     educationYear: {
//       type: Number,
//     },

//     company: {
//       type: String,
//       trim: true,
//     },

//     position: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
    
//       lowercase: true,
//       trim: true,
//       unique: true,
//       match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
//     },

//     aboutMe: {
//       type: String,
//       trim: true,
//       maxlength: 1000,
//     },

//     skills: [
//       {
//         type: String,
//         trim: true,
//       },
//     ],
//   },
//   {
//     timestamps: true, // adds createdAt & updatedAt
//   }
// );

// const UserProfile = mongoose.model("USERPROFILE", UserProfileSchema);

// module.exports = UserProfile;


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    // ✅ Link profile to authenticated user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    post: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    websiteUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Invalid website URL",
      },
    },

    university: {
      type: String,
      trim: true,
    },

    degree: {
      type: String,
      trim: true,
    },

    educationYear: {
      type: Number,
    },

    company: {
      type: String,
      trim: true,
    },

    position: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    aboutMe: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("USERPROFILE", UserProfileSchema);

module.exports = UserProfile;