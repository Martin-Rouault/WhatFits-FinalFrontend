import { useQuery } from "@tanstack/react-query"
import { getBuild } from "@/api/builds.api"

export function useBuild(id: number) {
  return useQuery({
    queryKey: ["build", id],
    queryFn: () => getBuild(id),
    enabled: !Number.isNaN(id)
  })
}
