import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    condition: '',
    medicalHistory: '',
    treatmentPlan: '',
  });
  
  const { request, loading, error } = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      url: 'http://localhost:4000/api/patients',
      data: formData,
    };
    
    const { response, error: axiosError } = await request(options);

    if (response) {
      console.log('Patient created:', response.data);
      toast.success('Patient created')
    } else {
      console.error('Error creating patient:', axiosError);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            placeholder="Enter patient's name" 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input 
            type="number" 
            id="age"
            name="age" 
            placeholder="Enter patient's age" 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
          <input 
            type="text" 
            id="condition"
            name="condition" 
            placeholder="Enter patient's condition" 
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
          <textarea 
            id="medicalHistory"
            name="medicalHistory" 
            placeholder="Enter patient's medical history" 
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="treatmentPlan" className="block text-sm font-medium text-gray-700">Treatment Plan</label>
          <textarea 
            id="treatmentPlan"
            name="treatmentPlan" 
            placeholder="Enter patient's treatment plan" 
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Patient...' : 'Add Patient'}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default AddPatientForm;