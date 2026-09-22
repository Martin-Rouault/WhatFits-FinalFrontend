import { useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/motion/button/base"

import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { MenuIcon } from "lucide-react"
import TopRightMenu from "./TopRightMenu"

import { useCurrentUser } from "@/lib/hooks/auth/useCurrentUser"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: user } = useCurrentUser()

  return (
    <>
      <nav className="sticky top-0 flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-lg font-medium no-underline">
          What<span className="text-primary">Fits</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="float-left ml-6 hidden flex-1 md:block">
          <Link
            to="/"
            className="rounded-md px-1.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:px-3"
          >
            Home
          </Link>
          <Link
            to="/feed"
            className="rounded-md px-1.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:px-3"
          >
            Feed
          </Link>
          <Link
            to="/about"
            className="rounded-md px-1.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:px-3"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Auth Buttons - Desktop only */}

          {/* Actions */}
          {!user && (
            <div className="hidden gap-2 md:flex">
              <Link to="/login">
                <Button variant="outline" size="md">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="md">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>

          {/* User Menu - Desktop only */}
          <div className="hidden md:block">
            <TopRightMenu />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  )
}

export default Navbar
