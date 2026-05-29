// controllers/communityController.js

import Community from "../models/Community.js";

export const createCommunity = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCommunity = await Community.findOne({
      name,
    });

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