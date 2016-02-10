var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoback');

require('./models/todo')

var Todo = mongoose.model('Todo');

app.get('/todos', function (req, res){
  Todo.find().lean().exec(function (err, todos){
    res.send( JSON.stringify(todos) );
  });
});

app.post('/todos', function (req, res){
  console.log("entra");
  if (req.body.name) {
    console.log("if");
    Todo.findOrCreate({
      name: req.body.name
    }, function (err, docs){
      console.log("callback");
      if (err) {
        console.log("error");
        res.send(req.body);
      }
      res.send(req.body)
    });
  }
});

app.listen(3000, function(){
  console.log("running server on 3000");
});
