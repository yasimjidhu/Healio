import React from "react";
import { User, Calendar, Activity, Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();

  const handleViewDetailClick = () => {
    navigate(`/view-detail/${patient._id}`); 
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl max-w-sm w-full mx-auto">
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <User className="text-blue-500" size={24} />
          </div>
          <h3 className="font-bold text-xl text-gray-800">{patient.name}</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-700 flex items-center">
            <Calendar className="mr-2 text-gray-500" size={16} />
            <span className="font-medium">Age:</span> {patient.age}
          </p>
          <p className="text-gray-700 flex items-center">
            <Activity className="mr-2 text-gray-500" size={16} />
            <span className="font-medium">Condition:</span> {patient.condition}
          </p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button
          className="w-full bg-primary-medium hover:bg-primary-gray text-white font-semibold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out flex items-center justify-center"
          onClick={handleViewDetailClick}
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
