var express = require("express");
var bodyParser = require("body-parser");
var lowdb = require("lowdb");
var db = lowdb("db.json");
var uuid = require("uuid");
var server = express();
var port = process.env.PORT || 8080;
var Todo = require('./models/todo.js');
//database initialization
db.defaults({todos: []})
  .value();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/todos', function(request, response)
{
  var result = db.get('todos')
                  .value();
  response.send(result);
});

server.get('/todos/:id', function(request, response)
{
  var todo = db.get('todos')
                .find({id: request.params.id})
                .value();
  response.send(todo);
});
server.post('/todos', function(request, response)
{
  var todo = new Todo(request.body.description);
  var result = db.get('todos')
                .push(todo)
                .last()
                .value();
  response.send(result);
});

server.put('/todos/:id', function(request, response)
{
  var todo = new Todo(request.body.description, request.params.id);
  todo.updateComplete(request.body.isComplete);
  var updatedTodo = db.get('todos')
                      .find({id: request.params.id})
                      .assign(todo)
                      .value();
  response.send(updatedTodo);
});

server.delete('/todos/:id', function(request, response)
{
  var todo = db.get('todos')
                .remove({id: request.params.id})
                .value();
  response.send(todo);
});

server.listen(port, function(){
  console.log('now listening on port ' + port);
});
