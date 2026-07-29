import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../services/dashboard/dashboard.service";

export default function useAdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getAdminDashboardStats();

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboard,
    loading,
    refresh: loadDashboard,
  };
}
