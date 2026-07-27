import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGrievance } from "../services/grievances/grievance.service";

export const useCreateGrievance = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createGrievance,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-grievances"]
            });
        }

    });

};