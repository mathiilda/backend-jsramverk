const { ObjectId } = require("bson");
const database = require("../db/database.js");

const comment = {
  create: async function(res, text) {
    let db;

    try {
        database.setCollectionName("comments");
        db = await database.getDb();
        let id = ObjectId();
        let item = { "_id": id, "text": text};
        await db.collection.insertOne(item);

        return res.status(200).json({
            id: id,
        })
    } catch (e) {
        return res.status(500).json({
            error: {
                status: 500,
                path: "/comment/create",
                title: "Database error",
                message: err.message
            }
        });
    } finally {
        await db.client.close();
    }
  },
  getSpecific: async function(res, id) {
    let db;

    try {
        database.setCollectionName("comments");
        db = await database.getDb();
        let result = await db.collection.find({"_id": ObjectId(id)}).toArray();

        return res.status(200).json({
            data: result
        });
    } catch (err) {
        return res.status(500).json({
            error: {
                status: 500,
                path: "/comment/getSpecific",
                title: "Database error",
                message: err.message
            }
        });
    } finally {
        await db.client.close();
    }
  }
}

module.exports = comment;