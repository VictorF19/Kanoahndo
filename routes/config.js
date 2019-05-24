var express = require('express');
var router = express.Router();
var getAllObjectsAndRender = require('../Gerais/getAllObjectsAndRender')

/* GET home page. */
router.get('/', function(req, res, next) {
    getAllObjectsAndRender(res, 'config')
});

module.exports = router;