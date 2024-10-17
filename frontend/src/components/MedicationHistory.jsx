export const MedicationHistory = ({ medications }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Medication History</h3>
      {medications && medications.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Medication Name</th>
              <th className="border px-4 py-2">Dosage</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{med.name}</td>
                <td className="border px-4 py-2">{med.dosage}</td>
                <td className="border px-4 py-2">{new Date(med.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{med.endDate ? new Date(med.endDate).toLocaleDateString() : 'Ongoing'}</td>
                <td className="border px-4 py-2">{med.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medications found.</p>
      )}
    </div>
  );
  