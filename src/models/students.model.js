const mongoose = require("mongoose");
const studentsCollection = "students";

const studentSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  dni: {
    type: String,
    require: true,
    unique: true
  },
  age: {
    type: Number,
    require: true
  },
  course: {
    type: String,
    require: true
  },
  grade: {
    type: String,
    require: true
  }
});

const studentModel = mongoose.model(studentsCollection, studentSchema);

module.exports = studentModel;
