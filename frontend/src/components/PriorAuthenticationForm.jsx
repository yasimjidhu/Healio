import React, { useState, useEffect } from "react";
import { submitPriorAuthorization, getPatient } from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams, useNavigate } from "react-router-dom";

const PriorAuthorizationForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: patientId || "",
    service: "",
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!patientId) return;
        const response = await getPatient(patientId);
        setPatient(response.data);
        setFormData({ ...formData, patientId: response.data._id });
      } catch (error) {
        setErrorMessage("Error fetching patient. Please try again.");
      }
    };
    fetchPatient();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if ( !formData.service || !formData.treatmentType || !formData.insurancePlan || !formData.dateOfService || !formData.diagnosisCode) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await submitPriorAuthorization(formData);
      setSuccessMessage("Prior authorization request submitted successfully!");
      setErrorMessage("");
      navigate(`/patients/${patientId}`); // Redirect to the patient details page
    } catch (error) {
      setErrorMessage("Error submitting request. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Prior Authorization Request
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        {/* Patient Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
            Patient Name
          </label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
            <input type="text" value={patient ? patient.name : ''} disabled className="w-full cursor-not-allowed" />
          </div>
        </div>

        {/* Service */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
            Service Needed
          </label>
          <input
            type="text"
            id="service"
            name="service"
            placeholder="Enter Service Needed"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Treatment Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatmentType">
            Treatment Type
          </label>
          <input
            type="text"
            id="treatmentType"
            name="treatmentType"
            placeholder="Enter Treatment Type"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Insurance Plan */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="insurancePlan">
            Insurance Plan
          </label>
          <input
            type="text"
            id="insurancePlan"
            name="insurancePlan"
            placeholder="Enter Insurance Plan"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Date of Service */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfService">
            Date of Service
          </label>
          <input
            type="date"
            id="dateOfService"
            name="dateOfService"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Diagnosis Code */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosisCode">
            Diagnosis Code
          </label>
          <input
            type="text"
            id="diagnosisCode"
            name="diagnosisCode"
            placeholder="Enter Diagnosis Code"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Enter Additional Notes"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary-gray hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
          >
            {loading ? (
              <ClipLoader loading={loading} size={15} color="#ffffff" />
            ) : (
              "Submit Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriorAuthorizationForm;
