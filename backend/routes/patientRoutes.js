const express = require('express');
const { getPatients, getPatientById,createPatient } = require('../controllers/patientController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/',verifyToken, getPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);

module.exports = router;
