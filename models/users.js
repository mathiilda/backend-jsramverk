const { ObjectId } = require("bson");
const database = require("../db/database.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let config;

try {
    config = require("../config.json");
} catch (err) {
    console.log(err);
}

const secret = config.secret || process.env.SECRET_SECRET;

const users = {
    create: async function(res, username, password) {
        bcrypt.hash(password, 10, async function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            let db;

            try {
                database.setCollectionName("users");
                db = await database.getDb();
                let id = ObjectId();
                let item = { "_id": id, "username": username, "password": hash };
                await db.collection.insertOne(item);
                let jwtToken = jwt.sign({ username: username }, secret, { expiresIn: '12h' });

                return res.status(200).json({
                    data: "User was created.",
                    id: id,
                    token: jwtToken
                })
            } catch (e) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        path: "/users/create",
                        title: "Database error",
                        message: err.message
                    }
                });
            } finally {
                await db.client.close();
            }
        });
    },
    getAll: async function (res) {
        let db;

        try {
            database.setCollectionName("users");
            db = await database.getDb();
            const result = await db.collection.find().toArray();

            return res.status(200).json({
                data: result
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/users/getAll",
                    title: "No users found.",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    getSpecific: async function(res, username, onlyUser=false) {
        let db;

        try {
            database.setCollectionName("users");
            db = await database.getDb();
            const ifExists = await db.collection.find({"username": username}).toArray();

            if (onlyUser) {
                return ifExists;
            }

            return res.status(200).json({
                data: ifExists
            });
        } catch (err) {
            return res.status(500).json({
                error: {
                    status: 500,
                    path: "/users/create",
                    title: "Database error",
                    message: err.message
                }
            });
        } finally {
            await db.client.close();
        }
    },
    login: async function(res, username, insertedPassword) {
        try {
            let user = await this.getSpecific(res, username, true);

            bcrypt.compare(insertedPassword, user[0].password, (err, result) => {
                if (result) {
                    let jwtToken = jwt.sign({ username: username }, secret, { expiresIn: '12h' });

                    return res.json({
                        data: {
                            type: "success",
                            message: "User logged in",
                            token: jwtToken,
                            id: user[0]._id
                        }
                    });
                }

                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: "/login",
                        title: "Wrong password",
                        detail: "Password is incorrect."
                    }
                });
            });
        } catch (e) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "users/login",
                    title: "Database error"
                }
            });
        }
    },
    verifyToken: async function (req, res, next) {
        if (process.env.NODE_ENV == "test") {
            return next();
        }
        
        let token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                return next();
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }        
    }
};

module.exports = users;