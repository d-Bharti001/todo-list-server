const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    description: {
        type: "string",
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

TodoSchema.pre("save", function () {
    this.updatedAt = Date.now();
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
