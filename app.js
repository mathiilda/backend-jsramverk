const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const httpServer = require("http").createServer(app);

const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');

const port = process.env.PORT || 1337;
const index = require('./routes/index');
const bodyParser = require("body-parser");
const documents = require("./models/documents.js");
const mail = require("./models/mail.js");
const { addUser } = require("./models/documents.js");

// app.use(cors({
//     origin: ["http://localhost:3000", "https://student.bth.se"]
// }));

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    // console.log(req.method);
    // console.log(req.path);
    
    // res.header('Access-Control-Allow-Origin', '*');
    var err = new Error("Not Found");
    err.status = 404;
    next();
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});


app.use('/', index);

var schema = buildSchema(`type Query {docs(userId: String, mode: Boolean) : String}`);
var root = {
    docs: async ({userId, mode}) => {
        return await documents.getAll(undefined, userId, mode);
    }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false, // Visual är satt till true under utveckling
}));

const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://www.student.bth.se"],
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', function(socket) {
    socket.on('create', function(room) {
        socket.join(room);
    });

    socket.on('doc', function(data) {
        socket.to(data["_id"]).emit("doc", data);
    });
});

const server = httpServer.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;