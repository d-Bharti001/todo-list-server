const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
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

UserSchema.pre("save", function () {
    this.updatedAt = Date.now();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
