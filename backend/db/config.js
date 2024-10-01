const mongoose = require("mongoose");
require("dotenv").config();

// mongoose.connect("mongodb://localhost:27017/e-commerce");
mongoose.connect(process.env.MONGO_DB_URL);
