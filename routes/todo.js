const router = require("express").Router();
const todo = require("../controllers/todo");

router.get("/", todo.getAllTodos);
router.get("/:id", todo.getTodo);
router.post("/", todo.createTodo);
router.patch("/:id", todo.updateTodo);
router.delete("/:id", todo.deleteTodo);

module.exports = router;
