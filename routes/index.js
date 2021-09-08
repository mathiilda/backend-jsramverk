
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
// update to post
router.get('/docs/create/:title&:text', (req, res) => {
    documents.create(res, req.params.text, req.params.title)
});

// update document
// update to put
router.get('/docs/update/:id&:title&:text', (req, res) => {
    documents.update(res, req.params.id, req.params.text, req.params.title)
});

module.exports = router;