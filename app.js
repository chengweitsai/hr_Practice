var express = require('express');
var app = express();

var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var nunjucks = require('nunjucks');
var path = require('path');
app.set('src', path.join(__dirname, 'src'));
app.set('src engine', 'nunjucks');
nunjucks.configure('src', {
  autoescape: true,
  express: app
});

var database = {
    users: [
        {
            id: 0,
            name:'Mark',
        },
        {
            id: 1,
            name:'Dennis',
        }
    ],
};


router.get('/', function (req, res) {
  res.render('index.html', { title: 'Express' });
});


router.get('/api/users',function (req, res) {
  res
    .status(200)
    .json(database);
});

router.post('/api/users', function (req, res) {
  database.users.push({id: parseInt(req.body.id), name:req.body.name});
  res
    .status(200)
    .json(database);
})

router.get('/api/users/:id', function (req, res) {
  var founds = database.users.filter(function(x){ return (''+ x.id === req.params.id) });
  //console.log();
  if (founds.length !== 0)
    res
      .status(200)
      .json( founds[0] );
  else
    res
      .status(400)
      .send(`Target id ${req.params.id} is not found in database.`);
});

router.put('/api/users/:id', function (req, res) {
  var founds = database.users.filter(function(x){ return (''+ x.id === req.params.id) });
  if (founds.length !== 0) {
    founds.forEach( function(x){x.name = req.body.name} );
    res
      .status(200)
      .json( founds[0] );
  }
  else
    res
      .status(400)
      .send(`Target id ${req.params.id} is not found in database.`);
});

router.delete('/api/users/:id', function (req, res) {
  var founds = database.users.filter(function(x){ return (''+ x.id === req.params.id) });
  if (founds.length !== 0) {
    database.users = database.users.filter(function(x){ return (''+ x.id !== req.params.id) });
    res
      .status(200)
      .json( database );
  }
  else
    res
      .status(400)
      .send(`Target id ${req.params.id} is not found in database.`);
});



app.use( express.static('public') );

router.use(function (req, res) {
  res.sendStatus(404);
  /*
  res
  	.status(404)
  	.send('<h1>404: Page not found</h1>' );
  */
})

app.use('/', router);
app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});