import { useCallback, useEffect, useState } from "react";
import { getDepartmentGrievances } from "../services/grievances/grievance.service";

function useDepartmentGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrievances = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDepartmentGrievances();

      setGrievances(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load grievances.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrievances();
  }, [fetchGrievances]);

  return {
    grievances,
    loading,
    error,
    refresh: fetchGrievances,
  };
}

export default useDepartmentGrievances;
