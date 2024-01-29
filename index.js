const express = require("express")
const server = express()
const mongoose = require("mongoose");
const { createStudent, fetchAllStudents, basePath, notFound, fetchById, deleteStudent, updateStudent } = require("./controller/student.controller");

server.use(express.json());
server.use(express.urlencoded( {extended: true})); 


server.get("/", basePath);



server.post("/student", createStudent);

server.get("/student/:studentId", fetchById)

server.get("/student", fetchAllStudents);

server.put("/student/:studentId", updateStudent);

server.delete("/student/:studentId", deleteStudent);

server.all("*", notFound);

server.listen(2000, async() => {
  console.log("server is listening on port 2000")
  try{
    console.log("server connected")
    await mongoose.connect('mongodb://127.0.0.1:27017/store-collections');
    console.log("database connected")
  }catch(error){
    console.log(err)
  }
})
