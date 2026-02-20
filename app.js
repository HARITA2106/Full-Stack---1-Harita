const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).render("error", { error: err.message });
});

app.listen(3000, () => console.log("Server running on port 3000"));