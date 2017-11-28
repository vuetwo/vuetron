const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

router.route('/todos')
  .get(todoController.getAllTodos)
  .post(todoController.addNewTodo);

router.route('/todos/:id')
  .get(todoController.getOneTodo)
  .put(todoController.editOneTodo)
  .delete(todoController.deleteOneTodo);

module.exports = router;
