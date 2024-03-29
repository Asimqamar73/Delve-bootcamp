import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const enrolledCoursesSchema = new mongoose.Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 25,
      minLength: 5,
      required: [true, "Please provide name."],
    },
    email: {
      type: String,
      required: [true, "Please provide email."],
      validate: {
        validator: validator.isEmail,
        message: "Invalid email",
      },
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "Please provide password."],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    avatarCloudinayId: {
      type: String,
      default: null,
    },
    enrolledCourses: [enrolledCoursesSchema],
  },
  {
    timestamps: true,
  }
);

// To hash password...
studentSchema.pre("save", async function () {
  // console.log(this.isModified("password")) // return value will be boolean
  // console.log(this.modifiedPaths()) // return value will be an array filled with field names for ex: username password or email etc
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // console.log("Pre hook triggered... student schema")
});
studentSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
studentSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};
const Student = mongoose.model("Student", studentSchema);
export default Student;
