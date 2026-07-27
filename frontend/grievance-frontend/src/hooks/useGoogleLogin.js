import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "../services/auth/auth.service";

export const useGoogleLogin = () => {

    return useMutation({

        mutationFn: googleLogin

    });

};