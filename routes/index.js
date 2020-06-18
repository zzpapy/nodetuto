var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

 const tab = [
   "greg", "prag","laurent"
 ]
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Toto' });
  dbConn.query('SELECT * FROM client ORDER BY name ASC',function(err,rows)     {

    if(err) {
        req.flash('error', err);
        // render to views/books/index.ejs
        res.render('index',{data:'',title: 'Toto'});
    } else {
        // render to views/books/index.ejs
        res.render('index',{data:rows,title: 'Toto'});
    }
});
});


router.post('/add', function(req, res, next) {

  let name = req.body.name;
  let address = req.body.address;
  let errors = false;

  if(name.length === 0 || address.length === 0) {
      errors = true;

      // set flash message
      // req.flash('error', "Please enter name and address");
      // render to add.ejs with flash message
      res.render('index', {
          name: name,
          address: address
      })
  }

  // if no error
  if(!errors) {

      var form_data = {
          name: name,
          address: address
      }

      // insert query
      dbConn.query('INSERT INTO client SET ?', form_data, function(err, result) {
          //if(err) throw err
          if (err) {
              // req.flash('error', err)
            console.log(err)
              // render to add.ejs
              res.render('index', {
                  name: form_data.name,
                  address: form_data.address
              })
          } else {
              // req.flash('success', 'Book successfully added');
              res.redirect('/');
          }
      })
  }
})




/* GET home page. */
router.get('/toto/:id?', function(req, res, next) {
  let id = req.params.id
  console.log(id)
  res.render('page1', { 
    title: 'tutu',
    "nom":tab[id]+id ,
    tab :tab
});
});

/* GET home page. */
router.get('/affich/:id?', function(req, res, next) {
  let id = req.params.id
  dbConn.query('SELECT * FROM client WHERE id = ' + id, function(err, rows, fields) {
    if(err) throw err

    // if user not found
    if (rows.length <= 0) {
        req.flash('error', 'Book not found with id = ' + id)
        res.redirect('/books')
    }
    // if book found
    else {
        // render to edit.ejs
        res.render('affich', {
            title: 'Edit Book',
            id: rows[0].id,
            name: rows[0].name,
            address: rows[0].address
        })
    }
})
  // console.log(id)
  //   res.render('affich', { 
  //     id:id,
  //     title: 'tutu',
  //     "nom":tab[id]+id ,
  //     tab :tab
  // });
});

router.post('/update', function(req, res, next) {

  let id = req.body.id;
  console.log(req.body)
  let name = req.body.name;
  let address = req.body.address;
  let errors = false;

  if(name.length === 0 || address.length === 0) {
      errors = true;

      // set flash message
      // req.flash('error', "Please enter name and author");
      // render to add.ejs with flash message
      res.render('affich', {
          id: req.params.id,
          name: name,
          address: address
      })
  }

  // if no error
  if( !errors ) {

      var form_data = {
          name: name,
          address: address
      } 
      // update query
      dbConn.query('UPDATE client SET ? WHERE id = ' + id, form_data, function(err, result) {
          //if(err) throw err
          console.log(err)
          if (err) {
              // set flash message
              // req.flash('error', err)
              // render to edit.ejs
              res.render('affich', {
                  id: req.params.id,
                  name: form_data.name,
                  address: form_data.address
              })
          } else {
              // req.flash('success', 'Book successfully updated');
              res.redirect('/affich/'+id);
          }
      })
  }
})

router.post('/test', function(request, response) {
  var p1 = request.body.p1; 
  console.log("p1=" + p1);
});

module.exports = router;
