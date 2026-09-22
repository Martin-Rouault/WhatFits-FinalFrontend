import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeBuild } from "@/api/builds.api"
import type { Build } from "@/types/build"

export function useToggleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeBuild,

    onMutate: async (buildId) => {
      await queryClient.cancelQueries({ queryKey: ["builds"] }) // cancelling all queries to ensure that the data is not being compromised
      const previous = queryClient.getQueryData<Build[]>(["builds"]) // snapshot if a rollback is needed

      queryClient.setQueryData<Build[]>(["builds"], (old) =>
        old?.map((b) =>
          b.id === buildId
            ? { ...b, liked: !b.liked, likes_count: b.likes_count + (b.liked ? -1 : 1) }
            : b,
        ),
      )
      return { previous }
    },

    onError: (_err, _buildId, context) => {
      if (context?.previous) queryClient.setQueryData(["builds"], context.previous)
    },

    onSuccess: (data, buildId) => {
      queryClient.setQueryData<Build[]>(["builds"], (old) =>
        old?.map((b) =>
          b.id === buildId ? { ...b, liked: data.liked, likes_count: data.likes_count } : b,
        ),
      )
    },
  })
}