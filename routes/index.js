var express = require('express');
var router = express.Router();
const documents = require("../models/documents.js");

router.get('/', (req, res) => {
    const data = {
        data: {
            msg: "An api for creating and updating documents."
        }
    };

    res.json(data);
});

// get all documents
router.get('/docs', (req, res) => {
    documents.getAll(res)
});

// get specific document
router.get('/docs/:id', (req, res) => {
    documents.getSpecific(res, req.params.id);
});

// create document
router.post('/docs/create', (req, res) => {
    // title, text
    documents.create(res, req.body.text, req.body.title)
});

// update document
router.put('/docs/update', (req, res) => {
    //text, title, id
    documents.update(res, req.body.id, req.body.text, req.body.title)
});

module.exports = router;