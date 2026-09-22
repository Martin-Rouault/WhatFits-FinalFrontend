import { resendVerification } from "@/api/email.api"
import { useMutation } from "@tanstack/react-query"

export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerification,
  })
}
