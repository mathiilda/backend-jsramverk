var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const data = {
        data: {
            msg: "Index"
        }
    };

    res.json(data);
});

router.get('/hello/:msgg', (req, res) => {
    const data = {
        data: {
            msg: req.params.msgg
        }
    };

    res.json(data);
});

module.exports = router;