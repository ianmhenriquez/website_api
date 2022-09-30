var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Hi danique and mom and dad");
});

module.exports = router;