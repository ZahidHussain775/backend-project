const express = require("express");
const userRoutes = require("./routes/user.routes");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();
const cookieParser = require("cookie-parser");


const app = express();
const indexRoutes = require("./routes/index.route");
app.use("/", indexRoutes);


app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
})