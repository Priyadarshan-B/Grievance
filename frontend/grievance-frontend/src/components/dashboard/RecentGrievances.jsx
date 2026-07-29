import Card from "../common/Card";

function RecentGrievances({ data = [] }) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">Recent Grievances</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="p-4 text-center" colSpan={4}>
                  No recent grievances
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.department_name}</td>
                  <td className="p-2">{item.priority}</td>
                  <td className="p-2">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default RecentGrievances;
