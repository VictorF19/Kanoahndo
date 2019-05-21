var express = require('express');
var router = express.Router();
var getConnection = require('../Posting/getConnection');

router.get('/:id', function(req, res, next) {

    let id = req.params.id;
    let query = `select * from operacoes where id_objeto = ${id} order by nome`;
    let operacoes = [];

    getConnection(client => {
        client.query(query, (err, resp) => {
            if (!err)
            {
                resp.rows.forEach(element => {
                    operacoes.push({ id: element['id'], nome: element['nome'] });
                });

                res.send(JSON.stringify(operacoes));
            }
            else
            {
                throw err;
            }
        });
    });
});

module.exports = router;
