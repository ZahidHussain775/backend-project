const express = require("express");
const userRoutes = require("./routes/user.routes");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
connectDB();
const cookieParser = require("cookie-parser");

const indexRoutes = require("./routes/index.route");
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/", indexRoutes);


// Notes API  testing through thunder client 
const notes = []

app.post('/notes' , (req,res) => {

    notes.push(req.body);

   res.status(201).json({message: "Note added successfully", notes});
})

app.get('/notes', (req,res) => {
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes
      });
});

app.delete('/notes/:index', (req,res) => {
  
  const index = req.params.index;
  delete notes[index];

  res.status(200).json({
    message: "Note deleted successfully",
      });

});


app.patch('/notes/:index', (req,res) => {
  
  const index = req.params.index;
  const description = req.body.description;

  notes[index].description = description;

  res.status(200).json({
    message: "Note updated successfully",
  
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})

