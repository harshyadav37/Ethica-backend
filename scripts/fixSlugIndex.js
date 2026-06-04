require('dotenv').config();
const connectDB = require('../models/db');
const Community = require('../models/Community');

const run = async () => {
  try {
    await connectDB();

    // Unset slug fields that are explicitly null to allow sparse index to ignore them
    const unsetResult = await Community.updateMany({ slug: null }, { $unset: { slug: "" } });
    console.log('Unset slug nulls:', unsetResult.modifiedCount || unsetResult.nModified || 0);

    const col = Community.collection;
    const indexes = await col.indexes();
    const hasSlugIndex = indexes.find(i => i.key && i.key.slug === 1);

    if (hasSlugIndex) {
      try {
        await col.dropIndex('slug_1');
        console.log('Dropped existing slug_1 index');
      } catch (err) {
        console.warn('Could not drop slug_1 index:', err.message);
      }
    }

    await col.createIndex({ slug: 1 }, { unique: true, sparse: true });
    console.log('Created unique sparse index on slug');

    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
};

run();
