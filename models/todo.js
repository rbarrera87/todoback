var mongoose = require('mongoose');
//Esto va en el archivo que inicializa el proyecto
//mongoose.connect('mongodb://localhost/todoback');
(function (){
  var todoSchema = new mongoose.Schema({
    name: String
  });
  todoSchema.statics.findOrCreate = function(todoObj, done){
    //Check if the todo item was created before
    this.findOne({ name: todoObj.name }, function (err, todo) {
      if(err) return done(err);

      if(todo) return done(null, todo);

      todo = new Todo({name: todoObj.name});
      todo.save(done);
    })
  };

  //New variable is created since I am using it within a statistic method
  //on this script only on findOrCreate
  var Todo = mongoose.model('Todo', todoSchema);
})();
