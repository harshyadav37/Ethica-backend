require('dotenv').config();
const mongoose = require("mongoose");
const Community = require("../models/Community");

const migrateCommunities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");

    const communities = await Community.find({});
    console.log(`Found ${communities.length} communities`);

    for (const community of communities) {
      let updated = false;
      
      // Generate slug from name if not exists
      if (!community.slug) {
        community.slug = community.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        updated = true;
      }
      
      // Extract number from names like "local-18" and set communityNumber
      if (!community.communityNumber && community.name.includes('-')) {
        const parts = community.name.split('-');
        const num = parts[parts.length - 1];
        if (!isNaN(num)) {
          community.communityNumber = parseInt(num);
          updated = true;
        }
      }
      
      if (updated) {
        await community.save();
        console.log(`Updated: ${community.name} -> slug: ${community.slug}, number: ${community.communityNumber}`);
      }
    }
    
    console.log("Migration completed");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrateCommunities();
