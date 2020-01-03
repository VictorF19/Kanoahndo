var express = require('express');
var router = express.Router();
var getConnection = require('../Posting/getConnection');
var fs = require('fs')

const textosPath = require('../appConfig.js/textosPath')
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

        let operacao = new Operacoes(null, id_objeto, nome)

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

router.delete('/', async (req, res, next) => {

    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }")
        return
    }

    let id = req.body.id

    if(id == null || id == undefined || typeof id != "number")
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id attribute', 'obj': {} }")
        return
    }

    try
    {

        let operacao = await postAccess.get(new Operacoes(id))

        if(operacao == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Operation not found', 'obj': {} }")
            return
        }

        if(fs.existsSync(`${textosPath}${id}.txt`))
        {
            fs.unlinkSync(`${textosPath}${id}.txt`)
        }

        operacao = await postAccess.deleteRecord(operacao)

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

        responseError = {
            error: 1,
            msg: err,
            obj: {}
        }

        res.status(500).send(JSON.stringify(responseError))

    }

})

router.put('/', async (req, res, next) => {

    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }")
        return
    }

    let id = req.body.id

    let nome = req.body.nome

    let hasId = !(id == null || id == undefined || typeof id != "number")

    let hasNome = !(nome == null || nome == undefined || nome == "")

    if(!hasId || !hasNome)
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id attribute and a name attribute', 'obj': {} }")
        return
    }

    try
    {

        let operacao = await postAccess.get(new Operacoes(id)) // Operação existe?

        if(operacao == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Operation not found', 'obj': {} }")
            return
        }

        let lastName = operacao.nome

        if(lastName == nome)
        {
            res.status(406).send("{ 'error': 1, 'msg': 'No changes detected', 'obj': {} }")
            return
        }
        
        operacao.nome = nome

        operacao = await postAccess.update(operacao)

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

        responseError = {
            error: 1,
            msg: err,
            obj: {}
        }

        res.status(500).send(JSON.stringify(responseError))

    }

})

module.exports = router;
