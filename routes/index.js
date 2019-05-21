var express = require('express');
var router = express.Router();
var getConnection = require('../Posting/getConnection');

/* GET home page. */
router.get('/', function(req, res, next) {

  const query = 'select * from objetos order by nome';
  const objetos = [];

  getConnection(client => {
    client.query(query, (err, respq) => {
      if(!err)
      {
        respq.rows.forEach(element => {
          objetos.push({id: element['id'], nome: element['nome']});
        });

        res.render('index', { objetos: objetos });
      }
      else
      {
        throw err
      }
    });
  });
});

module.exports = router;
