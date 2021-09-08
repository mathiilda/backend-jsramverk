const { ObjectId } = require("bson");
const database = require("../db/database.js");

const documents = {
    getAll: async function (res) {
        let db;

        try {
            db = await database.getDb();
            const allDocuments = await db.collection.find().toArray();

            return res.status(200).json({
                data: allDocuments
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/documents",
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
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let result = await db.collection.findOne(query);

            return res.status(200).json({
                data: result
            })

        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/documents/:id",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    create: async function(res, text, title) {
        let db;

        try {
            db = await database.getDb();
            let item = { "_id": ObjectId(), "text": text, "title": title };
            await db.collection.insertOne(item);

            return res.status(200).json({
                data: "Document created."
            })

        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/documents/create",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    update: async function(res, id, text, title) {
        let db;

        try {
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let updatedDoc = { "text": text, "title": title }
            const options = { upsert: true };
            let result = await db.collection.replaceOne(query, updatedDoc, options);

            // if (result.modifiedCount === 0 && result.upsertedCount === 0) {
            //     console.log("No changes made to the collection.");
            // } else {
            //     if (result.matchedCount === 1) {
            //         console.log("Matched " + result.matchedCount + " documents.");
            //     }
            //     if (result.modifiedCount === 1) {
            //         console.log("Updated one document.");
            //     }
            //     if (result.upsertedCount === 1) {
            //         console.log("Inserted one new document with an _id of " + result.upsertedId._id);
            //     }
            // }

            return res.status(200).json({
                data: "Document updated."
            })

        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/documents/update",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    }
};

module.exports = documents;