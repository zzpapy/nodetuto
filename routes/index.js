var express = require('express');
var router = express.Router();
 const tab = [
   "greg", "prag","laurent"
 ]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toto' });
});

/* GET home page. */
router.get('/toto/:id', function(req, res, next) {
  let id = req.params.id
  console.log(id)
  res.render('page1', { 
    title: 'tutu',
    "nom":tab[id]+id ,
    tab :tab
});
});

module.exports = router;
