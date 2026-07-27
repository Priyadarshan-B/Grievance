import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "../services/dashboard/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: getUserDashboard,
  });
};
