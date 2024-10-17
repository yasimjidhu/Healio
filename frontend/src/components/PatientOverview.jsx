export const PatientOverview = ({ patient }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{patient.name}</h2>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>
      <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
      <p><strong>Treatment Plan:</strong> {patient.treatmentPlan}</p>
    </div>
  );
  