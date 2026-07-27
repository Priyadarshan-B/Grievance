import { useQuery } from "@tanstack/react-query";
import { getMyGrievances } from "../services/grievances/grievance.service";

export const useMyGrievances = () => {

    return useQuery({

        queryKey: ["my-grievances"],

        queryFn: getMyGrievances

    });

};