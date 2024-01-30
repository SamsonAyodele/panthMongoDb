const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favSubject: { type: String, required: true },
  class: { type: String, required: true },
  email: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
});

// const updateStudentSchema = mongoose.Schema({
//   favSubject: { type: String, required: true },
//   class: { type: String, required: true },
// });

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
