//Constructor - how to build this object
var uuid = require("uuid");

function Todo(description)
{
  this.id = uuid.v4();
  this.description = description;
  this.isComplete = false;
}

Todo.prototype.updateComplete = function(value)
{
  this.isComplete = value;
};

//var Todo1 = new Todo("read my book");
//var Todo2 = new Todo("build drone API");
//console.log(Todo1, Todo2);

module.exports = Todo;
