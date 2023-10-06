var express = require('express');
var router = express.Router();
var classes = require('../public/scripts/classes');

router.post('/', function(req, res, next) {
    classes.toggle(req.body.class, req.body.spec);
    res.redirect('back');
});

  module.exports = router;