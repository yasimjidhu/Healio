const express = require('express');
const { 
    createAuthorizationRequest, 
    getAuthorizationRequests, 
    approvePriorAuthorization, 
    rejectPriorAuthorization 
} = require('../controllers/authorizationController');

const verifyToken = require('../middleware/auth');
const { isAdmin } = require('../middleware/authorization');

const router = express.Router();

// Submit a prior authorization request
router.post('/submit',verifyToken, createAuthorizationRequest);

// Get the list of prior authorization requests
router.get('/list', verifyToken,isAdmin, getAuthorizationRequests);

// Approve a prior authorization request by ID
router.patch('/approve/:id',verifyToken,isAdmin, approvePriorAuthorization);

// Reject a prior authorization request by ID
router.patch('/reject/:id',verifyToken,isAdmin, rejectPriorAuthorization);

module.exports = router;
