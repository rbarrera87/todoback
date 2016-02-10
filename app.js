var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoback');

require('./models/todo')

var Todo = mongoose.model('Todo');

app.get('/', function(req, res){
  Todo.find().lean().exec(function (err, todos){
    res.send( JSON.stringify(todos) );
  });
});

app.listen(3000, function(){
  console.log("running server on 3000");
});
