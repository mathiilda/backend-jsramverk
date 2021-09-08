const mongo = require("mongodb").MongoClient;
const config = require("../config.json");
const collectionName = "docs";

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.ay5cw.mongodb.net/texteditor?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        console.log(collection);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;







// const mongo = require("mongodb").MongoClient;
// const config = require("../config.json");
// const collectionName = "docs";

// const database = {
//     getDb: async function getDb() {
//         let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.ay5cw.mongodb.net/texteditor?retryWrites=true&w=majority`;

//         if (process.env.NODE_ENV === 'test') {
//             dsn = "mongodb://localhost:27017/test";
//         }

//         const client  = await mongo.connect(dsn, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         const db = await client.db();
//         const collection = await db.collection(collectionName);

//         console.log(db.serverStatus());

//         return {
//             db: db,
//             collection: collection,
//             client: client,
//         };
//     }
// };

// module.exports = database;


// const mongoose = require("mongoose");
// const config = require("../config.json");
// const db = `mongodb+srv://${config.username}:${config.password}@cluster0.ay5cw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const collectionName = "docs";

// const database = {
//     getDb: async function getDb() {
//         try {
//             await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             });
//             console.log("MongoDB connected");

//             return {
//                 db: mongoose.connection,
//                 // collection: collection,
//                 // client: client,
//             };
//         } catch (error) {
//             console.error(error.message);
//             process.exit(1);
//         }
//     },
// }

// module.exports = database;