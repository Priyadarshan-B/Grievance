import { useEffect, useState } from "react";

import { getGrievanceById } from "../services/grievances/grievance.service";

const useGrievance = (id) => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [grievance, setGrievance] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchGrievance = async () => {
      try {
        setLoading(true);

        const response = await getGrievanceById(id);

        setGrievance(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load grievance.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrievance();
  }, [id]);

  return {
    grievance,
    loading,
    error,
    refresh: () => getGrievanceById(id),
  };
};

export default useGrievance;
