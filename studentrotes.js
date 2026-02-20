const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");
const validateStudent = require("../middleware/validateStudent");

router.get("/", controller.getAllStudents);
router.post("/add", validateStudent, controller.addStudent);
router.get("/edit/:id", controller.getEditForm);
router.post("/update/:id", controller.updateStudent);
router.get("/delete/:id", controller.deleteStudent);

module.exports = router;