require("dotenv").config();

const mongoose = require("mongoose");

const collections = [
  "announcements",
  "events",
  "galleryitems",
  "members",
  "projects",
  "resources",
  "users",
];

async function migrate() {
  const localUri =
    process.env.LOCAL_MONGODB_URI ||
    "mongodb://127.0.0.1:27017/dev-studio";

  const atlasUri = process.env.MONGODB_URI;

  if (!atlasUri) {
    throw new Error("MONGODB_URI is missing from backend/.env");
  }

  console.log("\nConnecting to LOCAL MongoDB...");
  const local = await mongoose
    .createConnection(localUri)
    .asPromise();

  console.log("✓ Local MongoDB connected");

  console.log("\nConnecting to MONGODB ATLAS...");
  const atlas = await mongoose
    .createConnection(atlasUri)
    .asPromise();

  console.log("✓ MongoDB Atlas connected\n");

  try {
    // Pre-flight check: query both databases for all collections before any writes
    console.log("Pre-flight collection check:");
    const preflight = [];
    let hasExistingAtlasData = false;

    for (const collectionName of collections) {
      const source = local.db.collection(collectionName);
      const target = atlas.db.collection(collectionName);

      const localCount = await source.countDocuments();
      const atlasCount = await target.countDocuments();

      preflight.push({ collectionName, localCount, atlasCount });
      console.log(
        `  ${collectionName}: Local=${localCount}, Atlas=${atlasCount}`
      );

      if (atlasCount > 0) {
        hasExistingAtlasData = true;
      }
    }

    if (hasExistingAtlasData) {
      throw new Error(
        "Atlas already contains data in one or more collections. Migration stopped for safety."
      );
    }

    console.log("\nStarting migration...\n");

    for (const { collectionName, localCount } of preflight) {
      if (localCount === 0) {
        console.log(`  ${collectionName}: 0 documents to migrate\n`);
        continue;
      }

      const source = local.db.collection(collectionName);
      const target = atlas.db.collection(collectionName);

      const documents = await source.find({}).toArray();
      const result = await target.insertMany(documents, {
        ordered: true,
      });

      console.log(
        `  ✓ ${collectionName}: Migrated ${result.insertedCount} documents\n`
      );
    }

    console.log("================================");
    console.log("MIGRATION COMPLETED SUCCESSFULLY");
    console.log("================================\n");

    console.log("Post-migration verification:");
    for (const collectionName of collections) {
      const count = await atlas.db
        .collection(collectionName)
        .countDocuments();

      console.log(`  ${collectionName}: ${count}`);
    }
  } finally {
    await local.close();
    await atlas.close();
  }
}

migrate().catch((error) => {
  console.error("\n❌ MIGRATION FAILED");
  console.error(error.message);
  process.exit(1);
});