import { Button } from "@/components/motion/button"
import { Heart } from "lucide-react"
import { useToggleLike } from "@/lib/hooks/builds/useToggleLike"
import { useCurrentUser } from "@/lib/hooks/auth/useCurrentUser"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router"

export function LikeBtn({
  buildId,
  liked,
}: {
  buildId: number
  liked: boolean
}) {
  const { data: user } = useCurrentUser()
  const { mutate } = useToggleLike()
  const navigate = useNavigate()

  function handleLike() {
    if (!user) {
      toast.error("Sign in to like builds", {
        action: { label: "Sign in", onClick: () => navigate("/login") },
        position: "top-center",
      })
      return
    }

    mutate(buildId, {
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          toast.error("Your session expired, please sign in again.", {
            action: { label: "Sign in", onClick: () => navigate("/login") },
            position: "top-center",
          })
        }
      },
    })
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      className="ml-auto border-0 bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-800"
      aria-pressed={liked}
      onClick={handleLike}
    >
      <Heart
        className={liked ? "size-3.5 fill-current text-red-500" : "size-3.5"}
      />
      Like
    </Button>
  )
}
