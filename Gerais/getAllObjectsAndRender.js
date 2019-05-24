let getConnection = require('../Posting/getConnection')

let getAllObjectsAndRender = (context, view) => {

    const query = 'select * from objetos order by nome';
    const objetos = [];
    
    getConnection(client => {
      client.query(query, (err, respq) => {
        if(!err)
        {
          respq.rows.forEach(element => {
            objetos.push({id: element['id'], nome: element['nome']});
          });
    
          context.render(view, { objetos: objetos });
        }
        else
        {
          throw err
        }
      });
    });
}

module.exports = getAllObjectsAndRender
