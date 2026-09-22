import { useBuilds } from "@/lib/hooks/builds/useBuilds"
import { BuildCard } from "@/components/features/builds/BuildCard"
import Loader from "@/components/layout/Loader"

export default function FeedPage() {
  const { data: builds, isLoading, isError } = useBuilds()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        An error has occured, please try again later. We are sorry.
      </p>
    )
  }

  if (!builds?.length) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        No publication at the moment
      </p>
    )
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {builds.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  )
}
