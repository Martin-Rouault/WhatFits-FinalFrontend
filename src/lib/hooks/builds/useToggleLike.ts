import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeBuild } from "@/api/builds.api"
import type { Build } from "@/types/build"

export function useToggleLike() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeBuild,

    onMutate: async (buildId) => {
      // On stoppe les refetch en cours sur les DEUX caches concernés
      await queryClient.cancelQueries({ queryKey: ["builds"] })
      await queryClient.cancelQueries({ queryKey: ["build", buildId] })

      // Snapshots pour rollback
      const previousList = queryClient.getQueryData<Build[]>(["builds"])
      const previousBuild = queryClient.getQueryData<Build>(["build", buildId])

      // 1) La liste ["builds"] (tableau)
      queryClient.setQueryData<Build[]>(["builds"], (old) =>
        old?.map((b) =>
          b.id === buildId
            ? {
                ...b,
                liked: !b.liked,
                likes_count: b.likes_count + (b.liked ? -1 : 1),
              }
            : b,
        ),
      )

      // 2) Le build seul ["build", id] (objet)
      queryClient.setQueryData<Build>(["build", buildId], (old) =>
        old
          ? {
              ...old,
              liked: !old.liked,
              likes_count: old.likes_count + (old.liked ? -1 : 1),
            }
          : old,
      )

      return { previousList, previousBuild }
    },

    onError: (_err, buildId, context) => {
      if (context?.previousList !== undefined)
        queryClient.setQueryData(["builds"], context.previousList)
      if (context?.previousBuild !== undefined)
        queryClient.setQueryData(["build", buildId], context.previousBuild)
    },

    // On réaligne les deux caches sur les valeurs faisant autorité du serveur
    onSuccess: (data, buildId) => {
      queryClient.setQueryData<Build[]>(["builds"], (old) =>
        old?.map((b) =>
          b.id === buildId
            ? { ...b, liked: data.liked, likes_count: data.likes_count }
            : b,
        ),
      )
      queryClient.setQueryData<Build>(["build", buildId], (old) =>
        old
          ? { ...old, liked: data.liked, likes_count: data.likes_count }
          : old,
      )
    },
  })
}
