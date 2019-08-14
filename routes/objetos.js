var express = require('express');
var router = express.Router();
var textoPath = require('../appConfig.js/textosPath');
var fs = require('fs');

const Objetos = require('../models/objeto')
const Operacoes = require('../models/operacao')
const postAccess = require('../infrastructure/postAccess')

router.post('/', async (req, res, next) => {
    
    if(req.headers["content-type"] != 'application/json')
    {
        res.status(406).send("{ 'error': 1, 'msg': 'Content-type must be application/json', 'obj': {} }")
    }
    else
    {

        let nome = req.body.nome

        if(nome == null || nome == undefined || nome == "")
        {
            res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a name attribute', 'obj': {} }")
        }
        else
        {

            let novoObjeto = new Objetos(null, nome)

            try
            {

                novoObjeto = await postAccess.insert(novoObjeto)

                let responseObject = {
                    error: 0,
                    msg: 'Success',
                    obj: novoObjeto
                }

                res.status(200).send(JSON.stringify(responseObject))
            }
            catch(e)
            {

                let error = e.stack

                let responseError = {
                    error: 1,
                    msg: error,
                    obj: {}
                }

                res.send(500).send(JSON.stringify(responseError))
            }
        }
    }
});

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

    let objeto = new Objetos(id, null)

    try
    {
        objeto = await postAccess.get(objeto)

        if(objeto == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Object not found', 'obj': {} }")
            return
        }

        let operacoes = await postAccess.getAllOperation(objeto.id)

        let l = operacoes.length

        if(l > 0)
        {
            for(var i = 0; i < l; i++)
            {

                if(fs.existsSync(`${textoPath}${operacoes[i].id}.txt`))
                {
                    fs.unlinkSync(`${textoPath}${operacoes[i].id}.txt`)
                }

                await postAccess.deleteRecord(new Operacoes(operacoes[i].id, operacoes[i].id_objeto, operacoes[i].nome))
            }
        }

        await postAccess.deleteRecord(objeto)

        let responseObject = {
            error: 0,
            msg: 'Success',
            obj: objeto
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

        res.send(500).send(JSON.stringify(responseError))
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

    if(id == null || id == undefined || typeof id != "number")
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a numeric id attribute', 'obj': {} }")
        return
    }

    if(nome == null || nome == undefined || nome == "")
    {
        res.status(406).send("{ 'error': 1, 'msg': 'JSON object must have a name attribute', 'obj': {} }")
    }

    let objeto = new Objetos(id, null)

    try
    {
        objeto = await postAccess.get(objeto)

        if(objeto == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Object not found', 'obj': {} }")
            return
        }

        if(objeto.nome == nome)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'No changes detected', 'obj': {} }")
            return
        }

        let sameName = await postAccess.get(new Objetos(null, nome))

        if(sameName != null && sameName.id != objeto.id)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'This name is already in use by other object', 'obj': {} }")
            return
        }

        objeto.nome = nome

        await postAccess.update(objeto)

        let responseObject = {
            error: 0,
            msg: 'Success',
            obj: objeto
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
