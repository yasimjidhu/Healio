import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPatients } from "../services/api";
import PatientCard from "./PatientCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const patientsPerPage = 8;

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await getPatients(currentPage, patientsPerPage);
      setPatients(response.data.patients);
      setTotalPages(response.data.totalPages);
    };

    if (user) {
      fetchPatients();
    }
  }, [user, currentPage]);

  // Apply filters
  const filteredPatients = patients.filter((patient) => {
    const matchesName = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if the patient's age matches the filter criteria
    const age = parseInt(patient.age);
    const matchesAge =
      (minAge ? age >= minAge : true) &&
      (maxAge ? age <= maxAge : true);

    return matchesName && matchesAge; 
  });

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
        Patient Dashboard
      </h1>
      <div className="mb-6 mt-4 flex justify-end">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-[30%] px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Filter Section */}
      <div className="mb-4">
        <label htmlFor="minAge">Min Age:</label>
        <input
          type="number"
          id="minAge"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
          className="border rounded p-2 mx-2"
        />
        <label htmlFor="maxAge">Max Age:</label>
        <input
          type="number"
          id="maxAge"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          className="border rounded p-2 mx-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard key={patient._id} patient={patient} />
          ))
        ) : (
          <p className="text-center text-gray-600 mt-8">No patients found.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {/* Pagination controls */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-primary-dark text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
