import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Car } from "lucide-react"
import { useEffect, useState } from "react"

export function BuildGallery({
  photos,
  carName,
}: {
  photos: { url: string }[]
  carName: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])
  return (
    <div>
      {photos.length > 0 ? (
        <Carousel className="w-full" setApi={setApi}>
          {/* Photo counter */}
          <div className="absolute top-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {current + 1} / {photos.length}
          </div>

          <CarouselContent>
            {photos.map((photo) => (
              <CarouselItem key={photo.url}>
                <div className="aspect-square overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={photo.url}
                    alt={carName}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {photos.length > 1 && (
            <>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </>
          )}
        </Carousel>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
          <Car className="size-16" />
        </div>
      )}
    </div>
  )
}
