var express = require('express');
var router = express.Router();
const documents = require("../models/documents.js")
const users = require("../models/users.js");
const mail = require("../models/mail.js");
const comment = require("../models/comment.js");

router.get('/', (req, res) => {
    const data = {
        data: {
            msg: "An api for creating and updating documents."
        }
    };

    res.json(data);
});

/*
* ROUTES RELATED TO DOCUMENTS
*/

// get all documents
router.get('/docs/:userId',
    (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.getAll(res, req.params.userId)
);

// get specific document
router.post('/docs/getSpecific',
    (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.getSpecific(res, req.body.id, false)
);

// create document
router.post('/docs/create', 
    (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.create(res, req.body.text, req.body.title, req.body.userId, req.body.mode)
);

// create pdf
router.get('/docs/createPdf/:id', 
    // (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.createPdf(res, req.params.id)
);

// update document
router.put('/docs/update',
    (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.update(res, req.body.id, req.body.text, req.body.title)
);

// add user
router.put('/docs/addUser',
    (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => documents.addUser(res, req.body.id, req.body.username)
);


/*
* ROUTES RELATED TO USERS
*/

// create user
router.post('/users/create', (req, res) => {
    users.create(res, req.body.username, req.body.password)
});

// get specific user
router.post('/users/getSpecific', (req, res) => {
    users.getSpecific(res, req.body.username)
});

// login
router.post('/users/login', (req, res) => {
    users.login(res, req.body.username, req.body.password)
});


/*
* ROUTES RELATED TO USERS
*/

// mail invite to user
router.get('/mail/send/:recipient&:documentId',
    // (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => mail.sendMail(req.params.recipient, req.params.documentId)
);



/*
* ROUTES RELATED TO COMMENTS
*/

// mail invite to user
router.post('/comment/create',
    // (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => comment.create(res, req.body.text)
);

router.post('/comment/getSpecific',
    // (req, res, next) => users.verifyToken(req, res, next),
    (req, res) => comment.getSpecific(res, req.body.id)
);

module.exports = router;