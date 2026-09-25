import { useParams, Link } from "react-router"
import { ArrowLeft, Calendar, Disc3, Heart, Ruler } from "lucide-react"

import Loader from "@/components/layout/Loader"
import { useBuild } from "@/lib/hooks/builds/useBuild"
import { LikeBtn } from "@/components/features/builds/LikeBtn"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { BuildGallery } from "@/components/features/builds/BuildGallery"

export function BuildPage() {
  const { id } = useParams()
  const { data: build, isLoading, isError } = useBuild(Number(id))

  if (isLoading)
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    )
  if (isError || !build)
    return (
      <p className="py-24 text-center text-muted-foreground">
        Build not found.
      </p>
    )

  const carName = `${build.car_model.make} ${build.car_model.name}`
  const initials = build.user.name.slice(0, 2).toUpperCase()
  const photos = build.photos ?? []

  const specs = [
    { icon: Calendar, label: "Year", value: build.car_year },
    {
      icon: Disc3,
      label: "Wheels",
      value: `${build.wheel.brand} ${build.wheel.name}`,
    },
    { icon: Ruler, label: "Size", value: `${build.diameter}×${build.width}J` },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Link
        to="/feed"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to feed
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <BuildGallery photos={photos} carName={carName} />

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{carName}</h1>
            <p className="text-muted-foreground">{build.car_year}</p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-muted text-sm font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{build.user.name}</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
          </div>

          {/* Specs */}
          <Card className="gap-0 divide-y divide-border p-0">
            {specs.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="size-4" />
                  {label}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </Card>

          {/* Likes + action */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Heart className="size-5" />
              <span className="font-semibold text-foreground">
                {build.likes_count}
              </span>
              likes
            </span>
            <LikeBtn buildId={build.id} liked={build.liked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildPage
