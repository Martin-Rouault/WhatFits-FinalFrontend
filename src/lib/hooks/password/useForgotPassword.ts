import { forgotPassword } from "@/api/password.api";
import { useMutation } from "@tanstack/react-query";

export function useForgotPassword() {
    return useMutation({
        mutationFn: forgotPassword
    })
}