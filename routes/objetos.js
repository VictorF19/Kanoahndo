var express = require('express');
var router = express.Router();
var textoPath = require('../appConfig.js/textosPath');
var fs = require('fs');

const Objetos = require('../models/objeto')
const Operacoes = require('../models/operacao')
const insertObject = require('../Posting/insertObject')
const getObject = require('../Posting/getObject')
const getGeneric = require('../Posting/getGeneric')
const deleteObject = require('../Posting/deleteObject')
const updateObject = require('../Posting/updateObject')

const insert = data => {
    return new Promise((resolve, reject) => {
        insertObject(data, (resp, err) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(resp)
            }
        })
    })
}

const get = data => {
    return new Promise((resolve, reject) => {
        getObject(data, (resp, err) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(resp)
            }
        })
    })
}

const getAllOperation = id => {
    return new Promise((resolve, reject) => {
        let text = 'select * from operacoes where id_objeto = $1'
        let values = [id]
        getGeneric(text, values, (resp, err) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(resp)
            }
        })
    })
}

const deleteRecord = data => {
    return new Promise((resolve, reject) => {
        deleteObject(data, (resp, err) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(resp)
            }
        })
    })
}

const update = data => {
    return new Promise((resolve, reject) => {
        updateObject(data, (resp, err) => {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(resp)
            }
        })
    })
}

router.post('/', (req, res, next) => {
    
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

            insert(novoObjeto).then(resp => {
                
                let objectResponse = {
                    error: 0,
                    msg: 'Success',
                    obj: {
                        id: resp.id,
                        nome: nome.id
                    }
                }

                res.status(200).send(JSON.stringify(objectResponse))

            }).catch(err => {

                res.status(500).send("{ 'error': 1, 'msg': 'Database insert error', 'obj': {} }")

            })
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
        objeto = await get(objeto)

        if(objeto == null)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'Object not found', 'obj': {} }")
            return
        }

        let operacoes = await getAllOperation(objeto.id)

        let l = operacoes.length

        if(l > 0)
        {
            for(var i = 0; i < l; i++)
            {

                if(fs.existsSync(`${textoPath}${operacoes[i].id}.txt`))
                {
                    fs.unlinkSync(`${textoPath}${operacoes[i].id}.txt`)
                }

                await deleteRecord(new Operacoes(operacoes[i].id, operacoes[i].id_objeto, operacoes[i].nome))
            }
        }

        await deleteRecord(objeto)

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
        objeto = await get(objeto)

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

        let sameName = await get(new Objetos(null, nome))

        if(sameName != null && sameName.id != objeto.id)
        {
            res.status(400).send("{ 'error': 1, 'msg': 'This name is already in use by other object', 'obj': {} }")
            return
        }

        objeto.nome = nome

        await update(objeto)

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

module.exports = router;
