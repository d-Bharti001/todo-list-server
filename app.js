require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectDB } = require("./config/db");
const routes = require("./routes");

const app = express();
app.use(express.json({ extended: true }));

connectDB();

app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
