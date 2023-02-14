const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.set("strictQuery", false).connect(process.env.MONGO_URI, () => {
        console.log("Connected to database");
    });
};

module.exports = {
    connectDB
};
