const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getDoctorProfile, updateDoctorProfile, getAllDoctors } = require('../controllers/doctorController');

// 👇 Add these lines
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/upload');
const Doctor = require('../models/Doctor'); // You’ll need this here

// Existing routes
router.get('/profile', verifyToken, getDoctorProfile);
router.put('/profile', verifyToken, updateDoctorProfile);
router.get('/all', verifyToken, getAllDoctors);

// 👇 NEW ROUTE: Upload Photo
router.post('/upload-photo', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
          req.userId,
          { $set: { 'profile.image': result.secure_url } },
          { new: true }
        );

        res.status(200).json(updatedDoctor);
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: 'Photo upload failed', error: err.message });
  }
});


module.exports = router;
