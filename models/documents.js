// var html_to_pdf = require('html-pdf-node');
const dataToPdf = require("from-data-to-pdf");
const { ObjectId } = require("bson");
const database = require("../db/database.js");
const puppeteer = require('puppeteer');

const documents = {
    getAll: async function (res, userId, mode) {
        let db;

        try {
            database.setCollectionName("docs");
            db = await database.getDb();
            const allDocuments = await db.collection.find({"users": ObjectId(userId), "mode": mode}).toArray();

            if (res === undefined) {
                return JSON.stringify(allDocuments);
            }

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
    getSpecific: async function(res, id, getUserIds=false) {
        let db;
        try {
            database.setCollectionName("docs");
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let result = await db.collection.findOne(query);

            if (getUserIds) {
                return result;
            }

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
    create: async function(res, text, title, userId, mode) {
        let db;

        try {
            database.setCollectionName("docs");
            db = await database.getDb();
            let item = { "_id": ObjectId(), "text": text, "title": title, "users": [ObjectId(userId)], "mode": mode };
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
    // createPdf: async function(res, id) {

    //     let result = await this.getSpecific(res, id, true);
    //     const browser = await puppeteer.launch({ headless: true });
    //     const newPage = await browser.newPage();
    //     await newPage.setContent(result.text);
    //     const buffer = await newPage.pdf({
    //         format: 'A4',
    //         margin: {
    //             left: '15px',
    //             top: '25px',
    //             right: '15px',
    //             bottom: '25px'
    //         }
    //     });
    //     await browser.close();
    //     res.end(buffer);
    // },
    update: async function(res, id, text, title) {
        let db;

        try {
            database.setCollectionName("docs");
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };
            let updatedDoc = { "text": text, "title": title};
            await db.collection.updateOne(query, {$set: updatedDoc});

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
    },
    addUser: async function(res, id, username) {
        let db;

        try {
            database.setCollectionName("users");
            db = await database.getDb();
            let user = await db.collection.findOne({ "username": username });

            database.setCollectionName("docs");
            db = await database.getDb();
            let query = { "_id": ObjectId(id) };

            await db.collection.updateOne(query, {$addToSet: {"users": user._id}});

            return res.status(200).json({
                data: "User added."
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