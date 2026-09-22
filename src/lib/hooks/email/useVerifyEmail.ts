import type { VerifyEmailParams } from "@/types/email"

import { verifyEmail } from "@/api/email.api"
import { useQuery } from "@tanstack/react-query"

export function useVerifyEmail(params: Partial<VerifyEmailParams>) {
  const complete = Boolean(params.id && params.hash && params.expires && params.signature)

  return useQuery({
    queryKey: ["verify-email", params.id, params.hash],
    queryFn: () => verifyEmail(params as VerifyEmailParams),
    enabled: complete,
    retry: false,
  })
}
