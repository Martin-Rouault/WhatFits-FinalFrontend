import { useQuery } from "@tanstack/react-query"
import { me } from "@/api/auth.api"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: me,
    retry: false,
    staleTime: Infinity,
  })
}
