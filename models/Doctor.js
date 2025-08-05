const mongoose = require('mongoose');
const { response } = require('express');

const doctorSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    degree: String,
    languages:[String],
    yearsOfExpertise: [{
      years:Number,
      specialisation:String,
      services:[String]
    }]
  },
  consultationDetails: {
    specialist: String,
    availableDates: [String],
    timings: String,
    timePerPatient: String,
    consultationFee: Number,
    onlineConsultation: Boolean,
    onlineTimings: String,
    clinicVisit: Boolean,
    doorstepAvailable: Boolean,
    emergencyAvailable: Boolean,
    responseTime:String,
    cancellationpolicy:String
  },
  profile: {
    practiceStatus: {
  availability: { type: String, },
  acceptingPatients: { type: String, default: 'Yes' }
},

    image: String,
    description: String,    //can be used as about
    feedback:[
      {rating: { type: Number, default: 0 },
      description:String}
    ],
    verified: Boolean,
    consultationCount: Number,
    Hospital: String,
    address: {
    state: String,
    district: String,
    mandal: String,
    streetArea: String,
    landmark: String
  }, 
  location: {
    lat: Number,
    lng: Number
  } ,

    // 📁 New section for document-based verification
  verification: {
    govtId: {
      type: { type: String }, // e.g., Aadhaar, PAN
      number: String,
      fileUrl: String
    },
    medicalRegistration: {
      registrationNumber: String,
      issuingCouncil: String,
      issueDate: Date,
      fileUrl: String
    },
    degrees: [{
      degreeName: String,
      university: String,
      year: Number,
      fileUrl: String
    }],
    practiceProof: {
      type: String, // e.g., Hospital ID
      hospitalName: String,
      fileUrl: String
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'needs_review'],
      default: 'pending'
    },
    verifiedAt: Date,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    notes: String
  },
  }

  
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
