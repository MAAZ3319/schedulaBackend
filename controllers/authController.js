const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password, name, contactNumber } = req.body;

    const existingDoctor = await Doctor.findOne({ "personalInfo.email": email });
    if (existingDoctor) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newDoctor = new Doctor({
      personalInfo: {
        ...req.body.personalInfo,
        name,
        email,
        contactNumber,
        password: hashedPassword,

         location: req.body.personalInfo.location,   
    yearsOfExpertise: req.body.personalInfo.yearsOfExpertise ,

      },
      profile: {
    address: {
      state: req.body.profile?.address?.state || ''
    }
  },
      consultationDetails:  {},
      
    });

    await newDoctor.save();

    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ "personalInfo.email": email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.personalInfo.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, doctor });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
