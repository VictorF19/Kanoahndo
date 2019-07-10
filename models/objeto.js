const Posting = require('../Posting/Posting')

class Objetos extends Posting
{
    constructor(id = null, nome = null)
    {
        super()
        this.id = id
        this.nome = nome
        this.setKey('id')
        this.setAuto('id')
    }
}

module.exports = Objetos
