const Patient = require('../models/Patient');

const createPatient = async (req, res) => {
    try {
        const { name, age, condition, medicalHistory, treatmentPlan } = req.body;
        const newPatient = new Patient({
            name,
            age,
            condition,
            medicalHistory,
            treatmentPlan,
        });
        await newPatient.save();
        console.log('patient saved')
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error });
    }
}

const getPatients = async (req, res) => {
    const { page, limit } = req.query;
    try {
        const patients = await Patient.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Patient.countDocuments();

        res.status(200).json({
            patients,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patients', error });
    }
};


const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patient details', error });
    }
};

module.exports = { getPatients, getPatientById,createPatient };
