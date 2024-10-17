import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PatientOverview } from "../components/PatientOverview";
import { PastTreatments } from "../components/PastTreatments";
import { MedicationHistory } from "../components/MedicationHistory";
import { LabResults } from "../components/LabResults";
import { User, Activity, Pill, FileText } from "lucide-react";

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [activeTab, setActiveTab] = useState("treatments");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/patients/${patientId}`
        );
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const tabs = [
    { id: "treatments", label: "Past Treatments", icon: Activity },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "labResults", label: "Lab Results", icon: FileText },
  ];

  const handleRequestAuthorization = () => {
    navigate(`/prior-authorization/${patientId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading patient data.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Patient Details
        </h1>
        <div className="flex justify-end">
          <button
            onClick={handleRequestAuthorization}
            className="mb-4 bg-primary-gray text-white py-2 px-4 rounded-full hover:bg-primary-dark transition duration-200"
          >
            Request Prior Authorization
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out transform hover:shadow-xl">
          <PatientOverview patient={patientData} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-wrap justify-start space-x-2 space-y-2 sm:space-y-0 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${
                  activeTab === tab.id
                    ? "bg-primary-gray text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2" size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 transition-all duration-300 ease-in-out">
            {activeTab === "overview" && (
              <PatientOverview patient={patientData} />
            )}
            {activeTab === "treatments" && (
              <PastTreatments treatments={patientData.treatments} />
            )}
            {activeTab === "medications" && (
              <MedicationHistory medications={patientData.medications} />
            )}
            {activeTab === "labResults" && (
              <LabResults labResults={patientData.labResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
