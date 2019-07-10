const Posting = require('../Posting/Posting')

class Operacoes extends Posting
{
    constructor(id = null, id_objeto = null, nome = null)
    {
        super()
        this.id = id
        this.id_objeto = id_objeto
        this.nome = nome
        this.setKey('id')
        this.setAuto('id')
    }
}

module.exports = Operacoes