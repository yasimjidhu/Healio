export const PastTreatments = ({ treatments }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Past Treatments</h3>
      {treatments && treatments.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Diagnosis</th>
              <th className="border px-4 py-2">Treatment</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{new Date(treatment.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{treatment.diagnosis}</td>
                <td className="border px-4 py-2">{treatment.description}</td>
                <td className="border px-4 py-2">{treatment.doctor}</td>
                <td className="border px-4 py-2">{treatment.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No past treatments found.</p>
      )}
    </div>
  );
  