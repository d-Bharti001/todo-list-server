const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
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
