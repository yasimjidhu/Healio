const AuthorizationRequest = require('../models/AuthorizationRequest');

const createAuthorizationRequest = async (req, res) => {
  try {

    const {
      patientId,
      service,
      treatmentType,  
      insurancePlan,  
      dateOfService,  
      diagnosisCode,  
      notes
    } = req.body;

    const newRequest = new AuthorizationRequest({
      patientId,
      service,
      treatmentType,  
      insurancePlan,  
      dateOfService,  
      diagnosisCode,  
      notes,
      status: 'pending'
    });

    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create authorization request', error });
  }
};

const approvePriorAuthorization = async (req, res) => {
  try {
    const request = await AuthorizationRequest.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Request approved", data: request });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve request" });
  }
};

const rejectPriorAuthorization = async (req, res) => {
  try {
    const request = await AuthorizationRequest.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Request rejected", data: request });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject request" });
  }
};

const getAuthorizationRequests = async (req, res) => {
  try {
    const requests = await AuthorizationRequest.find().populate('patientId');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch authorization requests', error });
  }
};

// Get a single prior authorization request by ID
const getAuthorizationRequestById = async (req, res) => {
  try {
    const request = await AuthorizationRequest.findById(req.params.id)
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ data: request });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch request" });
  }
};

module.exports = {
  createAuthorizationRequest,
  getAuthorizationRequests,
  getAuthorizationRequestById,
  approvePriorAuthorization,
  rejectPriorAuthorization
};
