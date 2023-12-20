const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,

  //this process is called Population
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
    },
  ],
});

const UserSchema = new mongoose.Schema({
  // Schema definition
  username: String,
  password: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model('admins', AdminSchema);
const User = mongoose.model('users', UserSchema);
const Course = mongoose.model('courses', CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
