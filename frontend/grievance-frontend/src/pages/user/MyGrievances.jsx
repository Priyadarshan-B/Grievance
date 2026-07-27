import { useMyGrievances } from "../../hooks/useMyGrievances";

function MyGrievances() {
  const {
    data,

    isLoading,

    error,
  } = useMyGrievances();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Failed to load grievances.</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Grievances</h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Category</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {data.data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-4">{item.title}</td>

              <td className="p-4">{item.category_name}</td>

              <td className="p-4">{item.status}</td>

              <td className="p-4">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyGrievances;
