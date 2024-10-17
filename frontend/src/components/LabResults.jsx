export const LabResults = ({ labResults }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Lab Results</h3>
      {labResults && labResults.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Test Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Reference Range</th>
              <th className="border px-4 py-2">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {labResults.map((result, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{result.testName}</td>
                <td className="border px-4 py-2">{new Date(result.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{result.value}</td>
                <td className="border px-4 py-2">{result.referenceRange}</td>
                <td className="border px-4 py-2">{result.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lab results found.</p>
      )}
    </div>
  );
  