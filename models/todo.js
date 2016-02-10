var mongoose = require('mongoose');
//Esto va en el archivo que inicializa el proyecto
//mongoose.connect('mongodb://localhost/todoback');

var todoSchema = new mongoose.Schema({
  name: String
});

mongoose.model('Todo', todoSchema);
