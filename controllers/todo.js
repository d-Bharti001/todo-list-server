const Todo = require("../models/todo");

const getAllTodos = (req, res) => {
    Todo.find().sort({ updatedAt: -1 }).then(todos => {
        res.status(200).json({ msg: "All todos found successfully.", result: todos });
    }).catch(err => {
        res.status(500).json({ msg: "Todos not found.", error: err.message });
    });
};

const getTodo = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ msg: "Send id" });
    }
    Todo.findById(req.params.id).then(todo => {
        if (!todo)
            throw new Error("Todo not present in the database.");
    }).then(todo => {
        res.status(200).json({ msg: "Todo found successfully.", result: todo });
    }).catch(err => {
        res.status(500).json({ msg: "Todo not found.", error: err.message });
    });
};

const createTodo = (req, res) => {
    const { description } = req.body;
    Todo.create({ description, user: null }).then(todo => {
        res.status(200).json({ msg: "Todo created successfully.", result: todo });
    }).catch(err => {
        res.status(500).json({ msg: "Failed to create todo.", error: err.message });
    })
};

const updateTodo = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ msg: "Send id" });
    }
    const { description } = req.body;
    Todo.findById(req.params.id).then(todo => {
        todo.description = description;
        return todo.save();
    }).then(todo => {
        res.status(200).json({ msg: "Todo updated successfully.", result: todo });
    }).catch(err => {
        res.status(500).json({ msg: "Failed to update todo.", error: err.message });
    });
};

const deleteTodo = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ msg: "Send id" });
    }
    Todo.findById(req.params.id).then(todo => {
        if (!todo) {
            throw new Error("Todo not found.");
        } else {
            return todo.delete();
        }
    }).then(todo => {
        res.status(200).json({ msg: "Todo deleted successfully.", result: todo });
    }).catch(err => {
        res.status(500).json({ msg: "Failed to delete todo.", error: err.message });
    });
};

module.exports = {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
