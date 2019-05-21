var express = require('express');
var router = express.Router();
var textoPath = require('../appConfig.js/textosPath');
var fs = require('fs');

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let texto = "";

    fs.readFile(`${textoPath}${id}.txt`, 'latin1', (err, data) => {
        if (!err)
        {
            texto = data.toString();
        }
        res.send(texto);
    });
});

module.exports = router;
