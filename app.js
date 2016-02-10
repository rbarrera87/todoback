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

//POST: /todos
app.post('/todos', function (req, res){
  if (req.body.name) {
    Todo.findOrCreate({
      name: req.body.name
    }, function (err, docs){
      if (err) {
        res.send(req.body);
      }
      res.send(req.body)
    });
  }
});

//DELETE /todos
app.delete('/todos', function (req, res){
  if (req.body._id) {
    Todo.remove({_id: req.body._id}, function (err, todo){
      res.send(req.body);
    });
  }else{
    res.status(500).send('You should send and _id');
  }
});

//post DELETE Everything just in development mode
app.post('/todos/removeall', function (req, res) {
  Todo.find({}, function(err, todos){
    todos.forEach(function(todo){
      todo.remove();
    });
  });
  res.send("TODOs were deleted");
});

//PUT /todos/:id
app.put('/todos', function (req, res){
  if (req.body._id) {
    Todo.update({_id: req.body._id}, {name: req.body.name}, function (err, todo){
      if (err) {
        res.send(err);
      }else{
        res.send(todo);
      }
    });
  }else{
    res.status(500).send('You should send and _id');
  }
});

app.listen(3000, function(){
  console.log("running server on 3000");
});
