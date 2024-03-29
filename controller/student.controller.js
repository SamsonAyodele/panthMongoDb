const {
  Student,
  validateStudent,
  validateUpdateStudent,
} = require("../models/student.model");

const basePath = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to our platform",
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(500).json({
      message: "Page not found",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const studentCheck = validateStudent(req.body);
    if (studentCheck.error) {
      return res.status(400).json({
        message: studentCheck.error.message,
      });
    }

    let studentExist = await Student.findOne({ name: req.body.name });
    if (studentExist) {
      return res.status(400).json({
        message: `this ${studentExist.name} already exist`,
      });
    }
    let student = new Student(req.body);
    await student.save();
    res.status(200).json({
      message: "Student Created successful",
      data: {
        _id: student.id,
        name: student.name,
        email: student.email,
        age: student.age,
        subject: student.subject,
        class: student.class,
        teacher: student.teacher.ref,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchById = async (req, res) => {
  try {
    let studentId = req.params.studentId;
    const student = await Student.findById(studentId).populate("teacher");
    if (!student) {
      return res.status(404).json({
        message: "student not found",
      });
    } else {
      return res.status(200).json({
        message: "successful",
        data: student,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchAllStudents = async (req, res) => {
  try {
    let student = await Student.find({}).populate("teacher");
    res.status(201).json({
      message: " successful",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentCheck = validateUpdateStudent(req.body);
    if (studentCheck.error) {
      return res.status(400).json({
        message: studentCheck.error.message,
      });
    }
    let studentId = req.params.studentId;
    let studentExist = await Student.findById(studentId);
    if (!studentExist) {
      return res.status(400).json({
        message: `Student does not exist`,
      });
    }

    let student = await Student.findByIdAndUpdate(
      studentId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json({
      message: " successful",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let studentId = req.params.studentId;

    let studentExist = await Student.findById(studentId);
    if (!studentExist) {
      return res.status(400).json({
        message: `this ${studentExist.name} does not exist`,
      });
    }

    let student = await Student.findOneAndDelete(studentId);
    res.status(201).json({
      message: " successful",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching student",
    });
  }
};

module.exports = {
  basePath,
  notFound,
  createStudent,
  fetchById,
  deleteStudent,
  fetchAllStudents,
  updateStudent,
};
