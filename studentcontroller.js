const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
};

exports.addStudent = async (req, res) => {
  await Student.create(req.body);
  res.redirect("/students");
};

exports.getEditForm = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
};

exports.updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
  res.redirect("/students");
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/students");
};