var express = require('express');
var router = express.Router();
var getConnection = require('../Posting/getConnection');

const postAccess = require('../infrastructure/postAccess')
const Objetos = require('../models/objeto')
const Operacoes = require('../models/operacao')

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

router.post('/', async (req, res) => {

    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }")
        return
    }

    let id_objeto = req.body.id_objeto

    let nome = req.body.nome

    let hasIdObjeto = !(id_objeto == null || id_objeto == undefined || typeof id_objeto != "number")

    let hasNome = !(nome == null || nome == undefined || nome == "")

    if(!hasIdObjeto || !hasNome)
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id attribute and a name attribute', 'obj': {} }")
        return
    }

    try
    {
        let objeto = new Objetos(id_objeto, null)

        objeto = await postAccess.get(objeto)

        if(objeto == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Object not found', 'obj': {} }")
            return
        }

        let operacao = new Operacoes(null, null, nome)

        operacao = await postAccess.get(operacao)

        if(operacao != null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'This name is already in use by other operation', 'obj': {} }")
            return
        }

        operacao = await postAccess.insert(new Operacoes(null, id_objeto, nome))

        let responseObject = {
            error: 0,
            msg: 'Success',
            obj: operacao
        }

        res.status(200).send(JSON.stringify(responseObject))
    }
    catch(e)
    {

        let err = e.stack

        let responseError = {
            error: 1,
            msg: err,
            obj: {}
        }

        res.status(500).send(JSON.stringify(responseError))
    }
})

module.exports = router;
