const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String },
  medicalHistory: { type: String }, 
  treatmentPlan: { type: String }, 
  medications: [
    {
      name: String,
      dosage: String,
      startDate: Date,
      endDate: Date,
      doctor: String,
    },
  ],
  labResults: [
    {
      testName: String,
      date: Date,
      value: String,
      referenceRange: String,
      doctor: String,
    },
  ],
  treatments: [
    {
      diagnosis: String,
      description: String,
      date: Date,
      doctor: String,
      notes: String,
    },
  ],
});

module.exports = mongoose.model('Patient', patientSchema);
