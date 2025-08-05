const Doctor = require('../models/Doctor');

exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.userId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

exports.updateDoctorProfile = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(
  req.userId,
  {
    $set: {
      'personalInfo.contactNumber': req.body.personalInfo?.contactNumber,
      'personalInfo.degree': req.body.personalInfo?.degree,
      'personalInfo.yearsOfExpertise': req.body.personalInfo?.yearsOfExpertise,
      'consultationDetails.specialist': req.body.consultationDetails?.specialist,
      'consultationDetails.timings': req.body.consultationDetails?.timings,
      'consultationDetails.timePerPatient': req.body.consultationDetails?.timePerPatient,
      'consultationDetails.consultationFee': req.body.consultationDetails?.consultationFee,
      'profile.Hospital': req.body.profile?.Hospital,
      'profile.description': req.body.profile?.description,
      'profile.image': req.body.profile?.image,
      'profile.practiceStatus.availability': req.body.profile?.practiceStatus?.availability,
      'profile.practiceStatus.acceptingPatients': req.body.profile?.practiceStatus?.acceptingPatients,
      'profile.address': req.body.profile?.address
    }
  },
  { new: true }
);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, {
      'personalInfo.name': 1,
      'personalInfo.specialist': 1,
      'profile.image': 1,
      'profile.description': 1,
      'consultationDetails.consultationFee': 1,
      'consultationDetails.timings': 1,
      'profile.feedback': 1,
      
    });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all doctors', error: error.message });
    console.error("UPDATE DOCTOR PROFILE ERROR:", error); 
  }
};

