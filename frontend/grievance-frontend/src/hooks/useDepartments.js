import { useCallback, useEffect, useState } from "react";

import { getDepartments } from "../services/departments/department.service";

function useDepartments() {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.data.data);

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load departments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    error,
    refresh: fetchDepartments,
  };
}

export default useDepartments;
