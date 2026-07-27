import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth/auth.service";

export const useLogin = () => {

    return useMutation({

        mutationFn: loginUser

    });

};