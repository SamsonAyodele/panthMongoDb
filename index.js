const express = require("express");
const server = express();
const mongoose = require("mongoose");
const {
  createStudent,
  fetchAllStudents,
  basePath,
  notFound,
  fetchById,
  deleteStudent,
  updateStudent,
} = require("./controller/student.controller");
const {
  createTeacher,
  fetchAllTeacher,
  fetchTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("./controller/teacher.controller");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", basePath);

server.post("/student", createStudent);

server.post("/teacher", createTeacher);

server.get("/student/:studentId", fetchById);

server.get("/teacher/:teacherId", fetchTeacherById);

server.get("/student", fetchAllStudents);

server.get("/teacher", fetchAllTeacher);

server.put("/student/:studentId", updateStudent);

server.put("/teacher/:teacherId", updateTeacher);

server.delete("/student/:studentId", deleteStudent);

server.delete("/teacher/:teacherId", deleteTeacher);

server.all("*", notFound);

server.listen(2000, async () => {
  console.log("server is listening on port 2000");
  try {
    console.log("server connected");
    await mongoose.connect("mongodb://127.0.0.1:27017/school-collections");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
});
