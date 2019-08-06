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

module.exports = {
    insert,
    get,
    getAllOperation, 
    deleteRecord,
    update
}
