// userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');


// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt with email: ${email}`); // Log the email attempting to log in

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }
    
    const isMatch = await user.comparePassword(password);
    console.log(`Password match for ${email}: ${isMatch}`); // Log the result of the password comparison

    if (!isMatch) {
      console.log(`Login failed: Invalid credentials for email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Login successful for email ${email}`);
    // Include the user type in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        type: user.type // Make sure to include this line
      }
    });
  } catch (error) {
    console.error(`Login error for email ${email}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Setup multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const imageFilter = (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });



// POST: Create a new user with validations
router.post('/create', [
  // Validation rules
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isStrongPassword().withMessage('Password does not meet strength requirements'),
  body('type').isIn(['employee', 'admin']).withMessage('Type must be either employee or admin'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password, type } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create and save the user
    const user = new User({ fullName, email, password: hashedPassword, type });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user: { id: user._id, fullName, email, type } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Update user details
router.put('/edit/:email', [
    param('email').isEmail().withMessage('Invalid email format'),
    body('fullName').optional().isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    body('password').optional().isStrongPassword().withMessage('Password does not meet strength requirements'),
  ], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { fullName, password } = req.body;
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      if (fullName) user.fullName = fullName;
      if (password) user.password = await bcrypt.hash(password, 8);
      await user.save();
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  module.exports = router;

// Delete a user
router.delete('/delete/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Retrieve all users
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Excludes the password from the result
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Upload image for user
router.post('/uploadImage', upload.single('image'), async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).send('Email must be provided');
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    if (!req.file) {
      return res.status(400).send('No image uploaded');
    }
    
    user.imagePath = req.file.path;
    await user.save();
    
    res.json({
      message: 'Image uploaded successfully',
      filename: req.file.filename, 
      path: req.file.path
    });
  } catch (error) {
    next(error); 
  }
}, (error, req, res, next) => { 
  if (error instanceof multer.MulterError) {

    return res.status(400).send(error.message);
  } else if (error) {

    return res.status(500).send(error.message);
  }

  next();
});


// Fetch all images
router.get('/getAllImages', async (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');

    // Assuming your images are stored in the 'images' directory on your backend
    const imageDir = path.join(__dirname, '..', 'images'); // Adjust the path as necessary
    const files = fs.readdirSync(imageDir);

    // Map the file names to their relative paths
    const images = files.map(filename => ({
      filename,
      path: `/images/${filename}` // Assuming the images are served from a route like '/images/filename'
    }));
    res.type('png');
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


  
module.exports = router;
