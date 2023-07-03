const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  newTodo,
  deleteTodo,
  updateTodo,
  completeTodo 
} = require("../controllers/todo");

router.route("/todos").get(getAllTodos).post(newTodo);
router.route("/todos/:id").put(updateTodo).delete(deleteTodo).patch(completeTodo);


module.exports = router;
