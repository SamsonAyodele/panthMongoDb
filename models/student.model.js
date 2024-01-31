const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  subject: { type: String },
  class: { type: String },
  email: { type: String },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
});

const Student = mongoose.model("student", studentSchema);

const validateStudent = (student) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(500).required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    class: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.required(),
  });
  return schema.validate(student);
};

const validateUpdateStudent = (student) => {
  const schema = Joi.object({
    age: Joi.number().required(),
    class: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.required(),
  });
  return schema.validate(student);
};

module.exports = { Student, validateStudent, validateUpdateStudent };
