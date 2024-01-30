const { Teacher } = require("../models/teacher.model");

const createTeacher = async (req, res) => {
  try {
    let teacherExist = await Teacher.findOne({ name: req.body.name });
    if (teacherExist) {
      return res.status(400).json({
        message: `Teacher ${teacherExist.name} already exist`,
      });
    }
    let teacher = new Teacher(req.body);
    await teacher.save();
    res.status(200).json({
      message: "Created successful",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchAllTeacher = async (req, res) => {
  try {
    let teacher = await Teacher.find({});
    res.status(200).json({
      message: "Fetch successful",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchTeacherById = async (req, res) => {
  try {
    let teacherId = req.params.teacherId;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(400).json({
        message: "Cannot find Teacher",
      });
    } else {
      return res.status(200).json({
        message: "Teacher fetched successfully",
        data: teacher,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateTeacher = async (req, res) => {
  try {
    let teacherExist = await Teacher.findOne({ name: req.body.name });
    if (teacherExist) {
      return res.status(400).json({
        message: `Teacher ${teacherExist.name} already exist`,
      });
    }
    let teacherId = req.params.teacherId;
    const teacher = await Teacher.updateOne(teacherId, req.body);
    res.status(200).json({
      message: "Teacher Updated Successfully",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    let teacherId = req.params.teacherId;

    let teacherExist = await Teacher.findById(teacherId);
    if (!teacherExist) {
      return res.status(400).json({
        message: `this ${teacherExist.name} does not exist`,
      });
    }

    let teacher = await Teacher.findOneAndDelete(teacherId);
    res.status(201).json({
      message: " successfully deleted",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTeacher,
  fetchAllTeacher,
  fetchTeacherById,
  updateTeacher,
  deleteTeacher,
};
