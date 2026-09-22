import { Link } from "react-router"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { ThemeToggle } from "./ThemeToggle"
import {
  HomeIcon,
  RssIcon,
  InfoIcon,
  UserIcon,
  SettingsIcon,
  Coffee,
  LogOutIcon,
} from "lucide-react"

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[1]}
      showSwipeHandle
    >
      <DrawerContent>
        {/* Contenu scrollable */}
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
          {/* Navigation Links */}
          <Link to="/" onClick={() => onOpenChange(false)}>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </button>
          </Link>
          <Link to="/feed" onClick={() => onOpenChange(false)}>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
              <RssIcon className="h-5 w-5" />
              <span>Feed</span>
            </button>
          </Link>
          <Link to="/about" onClick={() => onOpenChange(false)}>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
              <InfoIcon className="h-5 w-5" />
              <span>About</span>
            </button>
          </Link>

          <div className="my-2 h-px bg-border" />

          {/* User Menu Items */}
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
            <UserIcon className="h-5 w-5" />
            <span>Profile</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary/5">
            <Coffee className="h-5 w-5" />
            <span>Donate</span>
          </button>

          <div className="my-2 h-px bg-border" />

          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">Theme</span>
            <ThemeToggle />
          </div>

          <div className="my-2 h-px bg-border" />

          {/* Sign Out */}
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-destructive transition-colors hover:bg-destructive/10">
            <LogOutIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
