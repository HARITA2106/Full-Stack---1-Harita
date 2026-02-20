const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 17,
    max: 30
  }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);