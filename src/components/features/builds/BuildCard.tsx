import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Car, Heart, Images } from "lucide-react"
import type { Build } from "@/types/build"
import { LikeBtn } from "./LikeBtn"

export function BuildCard({ build }: { build: Build }) {
  const photo = build.photos?.[0]?.url
  const carName = `${build.car_model.make} ${build.car_model.name}`

  return (
    <Card className="gap-0 rounded-[28px] border-0 bg-white p-2.5 pb-4 text-white shadow-none ring-0 dark:bg-neutral-800">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-800">
        <img src={photo} alt={carName} className="h-full w-full object-cover" />
        <div className="flex h-full w-full items-center justify-center text-neutral-600">
          <Car className="size-10" />
        </div>

        <Avatar className="absolute top-2.5 left-2.5 size-7 ring-2 ring-black/25">
          <AvatarFallback className="bg-neutral-900 text-[11px] font-semibold text-neutral-100">
            {build.user.name}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="px-2 pt-3.5">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-base leading-tight text-neutral-900">
            {build.car_model.make} {build.car_model.name}
          </h3>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {build.car_year} · {build.wheel.brand} {build.wheel.name} ·{" "}
          {build.diameter}×{build.width}J
        </p>

        <div className="mt-4 flex items-center gap-3.5">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Heart className="size-4" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-black">
              {build.likes_count}
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Images className="size-4" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-black">
              {build.photos?.length ?? 0}
            </span>
          </span>
          <LikeBtn buildId={build.id} liked={build.liked} />
        </div>
      </div>
    </Card>
  )
}
