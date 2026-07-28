import { useCallback, useEffect, useState } from "react";

import { getGrievanceById } from "../services/grievances/grievance.service";

const useGrievance = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [grievance, setGrievance] = useState(null);

  const fetchGrievance = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const data = await getGrievanceById(id);

      // data =
      // {
      //   success: true,
      //   data: {
      //      grievance:{...},
      //      attachments:[],
      //      history:[]
      //   }
      // }

      setGrievance(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load grievance.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGrievance();
  }, [fetchGrievance]);

  return {
    grievance,
    loading,
    error,
    refresh: fetchGrievance,
  };
};

export default useGrievance;
