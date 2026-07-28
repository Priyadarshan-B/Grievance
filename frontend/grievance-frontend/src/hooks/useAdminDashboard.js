import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/dashboard/dashboard.service";

const useAdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getAdminDashboard();

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    dashboard,
    loading,
    refresh: loadDashboard,
  };
};

export default useAdminDashboard;
