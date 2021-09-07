// ev behövs body parser
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 1337;
const index = require('./routes/index');

app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
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
app.listen(port, () => console.log(`Example API listening on port ${port}!`));