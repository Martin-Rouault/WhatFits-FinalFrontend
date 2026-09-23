import { useLogout } from "@/lib/hooks/auth/useLogout"
import { LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router"

export function LogoutBtn({ onLoggedOut }: { onLoggedOut?: () => void }) {
  const { mutate } = useLogout()
  const navigate = useNavigate()

  function handleLogout() {
    mutate(undefined, {
      onSuccess: () => {
        onLoggedOut?.()
        navigate("/")
      },
    })
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
    >
      <LogOutIcon className="h-4 w-4" />
      Sign Out
    </button>
  )
}
