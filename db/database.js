const mongo = require("mongodb").MongoClient;
const collectionName = "docs";

let config;

try {
    config = require("../config.json");
} catch (err) {
    console.log(err);
}

const username = process.env.SECRET_USERNAME || config.username;
const password = process.env.SECRET_PASSWORD || config.password;

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb+srv://${username}:${password}@cluster0.ay5cw.mongodb.net/texteditor?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = `mongodb+srv://${username}:${password}@cluster0.ay5cw.mongodb.net/texteditor-test?retryWrites=true&w=majority`
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;