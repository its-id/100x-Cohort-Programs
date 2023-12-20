const express = require('express');
const router = express.Router();
const { User, Course } = require('../db/index');
const userMiddleware = require('../middleware/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
  // Implemented user signup logic
  const { username, password } = req.body;

  //checking if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
    return;
  } else {
    //hashing the password, so it can be stored in mongoDB
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating the user
    await User.create({ username, password: hashedPassword });
    res.status(200).json({ message: 'User created successfully' });
  }
});

router.post('/signin', async (req, res) => {
  // Implemented user signin logic
  const { username, password } = req.body;

  //checking if username already exists
  const user = await User.findOne({ username });
  if (!user)
    return res.status(401).json({ message: 'Wrong username or password' });
  else {
    //checking if password is correct
    const passwordValidates = bcrypt.compare(password, User.password);

    if (passwordValidates) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else
      return res.status(401).json({ message: 'Wrong username or password' });
  }
});

router.get('/courses', async (req, res) => {
  // Implemented listing all courses logic
  let courses = await Course.find({});

  //for each course in courses, adding a new key 'published' and set it to true
  courses = courses.map((course) => {
    return {
      ...course._doc,
      published: true,
    };
  });

  res.status(200).json({ courses: courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implemented user specific course purchase logic
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.username });

    //check if user already has the course
    if (user.courses.includes(course._id)) {
      res.status(400).json({ message: 'You already have this course' });
      return;
    }

    user.courses.push(course._id);
    await user.save();

    res.status(200).json({ message: 'Course purchased successfully' });
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {

    // Implemented fetching user-specific purchased courses logic
    const user = await User.findOne({username: req.username});
    let courses = [];

    for(let courseId of user.courses){
        const course = await Course.findById(courseId);
        courses.push({ ...course._doc, published: true });
    }

    res.status(200).json({ courses: courses });
});

module.exports = router;
