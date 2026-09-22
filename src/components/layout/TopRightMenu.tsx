import { useCurrentUser } from "@/lib/hooks/auth/useCurrentUser"
import { NavLink } from "react-router"
import { Button } from "../motion/button"
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from "@/components/motion/popover-morph"
import { SettingsIcon, UserIcon, Coffee, MenuIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutBtn } from "./LogoutBtn"

export default function TopRightMenu() {
  const { data: user } = useCurrentUser()

  return (
    <MorphPopover>
      <MorphPopoverTrigger>
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </MorphPopoverTrigger>
      <MorphPopoverContent side="bottom" align="end">
        <div className="flex min-w-45 flex-col gap-1 p-2">
          {user && (
            <NavLink to={"/profile"}>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5">
                <UserIcon className="h-4 w-4" />
                Profile
              </button>
            </NavLink>
          )}
          <NavLink to={"/account"}>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </button>
          </NavLink>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5">
            <Coffee className="h-4 w-4" />
            Donate
          </button>

          {user && (
            <>
              <div className="my-1 h-px bg-border" />
              <LogoutBtn />
            </>
          )}
        </div>
      </MorphPopoverContent>
    </MorphPopover>
  )
}
