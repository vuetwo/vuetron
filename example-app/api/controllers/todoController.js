const Todo = require('../models/Todo');

const todoController = {};

todoController.getAllTodos = (req, res) => {
  Todo
    .find({})
    .then(allTodos => res.status(200).send(allTodos))
    .catch(err => res.status(400).send(err));
};

todoController.addNewTodo = (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    note: req.body.note,
    status: req.body.status
  });

  newTodo
    .save()
    .then(createdTodo => res.status(201).send(createdTodo))
    .catch(err => res.status(400).send(err));
};

todoController.getOneTodo = (req, res) => {
  if (!req.params.id) throw new Error('id required');

  Todo
    .findById(req.params.id)
    .then(foundTodo => res.status(200).send(foundTodo))
    .catch(err => res.status(404).send(err));
};

todoController.editOneTodo = (req, res) => {
  if (!req.body.todo || !req.params.id) throw new Error('invalid request');

  Todo
    .updateOne({_id: req.params.id}, req.body.todo)
    .then(updatedTodo => res.status(200).send(updatedTodo))
    .catch(err => res.status(400).send(err));
};

todoController.deleteOneTodo = (req, res) => {
  if (!req.params.id) throw new Error('invalid request');

  Todo
    .remove({_id: req.params.id})
    .then(removedTodo => res.status(200).send(removedTodo))
    .catch(err => res.status(400).send(err));
};

module.exports = todoController;
