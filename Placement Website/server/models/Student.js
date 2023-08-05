import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "first name is required"],
    maxlength: 32,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "last name is required"],
    maxlength: 32,
  },

  email: {
    type: String,
    trim: true,
    required: [true, "email is required"],
    maxlength: 32,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "last name is required"],
    maxlength: 32,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
