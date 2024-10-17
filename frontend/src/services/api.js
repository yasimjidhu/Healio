import api from '../config/axiosInstance';
  
//  getPatients function to include pagination as query parameters
export const getPatients = async (currentPage, patientsPerPage) => {
    return api.get('/patients', {
        params: {
            page: currentPage,
            limit: patientsPerPage,
        },
    });
};

export const getPatient = async (patientId) => {
    return api.get(`/patients/${patientId}`);
};

// Function to submit prior authorization request
export const submitPriorAuthorization = async (formData) => {
    try {
      const response = await api.post("/prior-authorizations/submit", formData);
      return response.data;
    } catch (error) {
      console.error("Error submitting authorization request", error);
    }
  };
  
  // Function to get all prior authorization requests
  export const getPriorAuthorizationRequests = async () => {
    try {
      const response = await api.get("/prior-authorizations/list");
      return response.data;
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  // Function to approve a prior authorization request
export const approvePriorAuthorization = async (requestId) => {
    try {
        const response = await api.patch(`/prior-authorizations/approve/${requestId}`);
        return response.data;
    } catch (error) {
        console.error("Error approving authorization request", error);
    }
};

// Function to reject a prior authorization request
export const rejectPriorAuthorization = async (requestId) => {
    try {
        const response = await api.patch(`/prior-authorizations/reject/${requestId}`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting authorization request", error);
    }
};