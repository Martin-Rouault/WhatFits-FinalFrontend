import { useQuery } from "@tanstack/react-query"
import { getBuilds } from "@/api/builds.api"

export function useBuilds() {
  return useQuery({
    queryKey: ["builds"],
    queryFn: getBuilds,
  })
}
