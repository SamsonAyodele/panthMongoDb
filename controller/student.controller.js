const { Student } = require("../models/student.model");

const basePath = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to our platform",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Page not found",
    });
  }
};

const notFound = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to our platform",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Page not found",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    let studentExist = await Student.findOne({name: req.body.name})
    if(studentExist) {
      return res.status(400).json({
        message: `this ${studentExist.name} already exist`
      })
    }
    let student = new Student(req.body);
    await student.save();
    res.status(200).json({
      message: "Created successful",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error creating student",
    });
  }
};

const fetchById = async (req, res) => {
  try{
    let studentId = req.params.studentId
    const student = await Student.findById(studentId)
    if(!student) {
      return res.status(404).json({
        message: "student not found"
      })
    } else{
      return res.status(200).json({
        message: "successful",
        data: student
      })
    }
  }catch(error){
    console.log(error)
    res.status(500).json({
      message: "Error creating student",
    });
  }
}

const fetchAllStudents = async (req, res) => {
  try {
    let students = await Student.find({});
    res.status(201).json({
      message: " successful",
      data: students,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error fetching student",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    let studentId = req.params.studentId
    let student = await Student.findByIdAndUpdate(studentId, req.body);
    res.status(201).json({
      message: " successful",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error fetching student",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let studentId = req.params.studentId
    let student = await Student.findOneAndDelete(studentId);
    res.status(201).json({
      message: " successful",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error fetching student",
    });
  }
};

module.exports = { basePath, notFound, createStudent, fetchById, deleteStudent, fetchAllStudents, updateStudent };
