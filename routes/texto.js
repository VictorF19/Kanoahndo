var express = require('express');
var router = express.Router();
var textoPath = require('../appConfig.js/textosPath');
var fs = require('fs');

const postAccess = require('../infrastructure/postAccess')
const Operacoes = require('../models/operacao')

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

router.post('/', async (req, res, next) => {

    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }");
        return;
    }

    let id_operacao = req.body.id_operacao;

    let texto = req.body.texto;

    let hasIdOperacao = id_operacao != null && id_operacao != undefined && typeof id_operacao == "number";

    let hasTexto = texto != null && texto != undefined && texto != "";

    if(!hasIdOperacao || !hasTexto)
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id_operacao attribute and a texto attribute', 'obj': {} }");
        return;
    }

    try
    {

        let operacao = await postAccess.get(new Operacoes(id_operacao));

        if(operacao == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Operation not found', 'obj': {} }");
            return;
        }

        if(fs.existsSync(`${textoPath}${id_operacao}.txt`))
        {
            res.status(400).send("{ 'error': 1, 'msg': 'A file for this Operation already exists', 'obj': {} }");
            return;
        }

        fs.writeFileSync(`${textoPath}${id_operacao}.txt`, texto, { encoding: 'latin1' });

        let responseObject = {
            error: 0,
            msg: 'Success',
            obj: {
                id_operacao: id_operacao,
                texto: texto
            }
        };

        res.status(200).send(JSON.stringify(responseObject));

    }
    catch(e)
    {

        let err = e.stack;

        let responseError = {
            error: 1,
            msg: err,
            obj: {}
        };

        res.status(500).send(JSON.stringify(responseError))

    }

})

router.put('/', (req, res, next) => {

    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }");
        return
    }

    let id_operacao = req.body.id_operacao;

    let texto = req.body.texto;

    let hasIdOperacao = id_operacao != null && id_operacao != undefined && typeof id_operacao == "number"

    let hasTexto = texto != null && texto != undefined && typeof texto == "string" && texto != ""

    if(!hasIdOperacao || !hasTexto)
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id_operacao attribute and a texto attribute', 'obj': {} }");
        return
    }

    try
    {

        if(!fs.existsSync(`${textoPath}${id_operacao}.txt`))
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Operation not found', 'obj': {} }")
            return
        }

        let textoOriginal = fs.readFileSync(`${textoPath}${id_operacao}.txt`, { encoding: 'latin1' })

        if(textoOriginal.trim() == texto.trim())
        {
            res.status(400).send("{ 'error': 1, 'msg': 'No changes detected', 'obj': {} }")
            return
        }

        fs.writeFileSync(`${textoPath}${id_operacao}.txt`, texto, { encoding: 'latin1' });

        let responseObject = {
            error: 0,
            msg: 'Success',
            obj: {
                id_operacao: id_operacao,
                texto: texto
            }
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
