import { resetPassword } from "@/api/password.api";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
    return useMutation({
        mutationFn: resetPassword
    })
}