import { useState } from "react"
import { User as UserIcon, Cookie } from "lucide-react"

import Loader from "@/components/layout/Loader"
import { useCurrentUser } from "@/lib/hooks/auth/useCurrentUser"
import { cn } from "@/lib/utils"
import { ProfilePanel } from "./ProfilePanel"
import { CookiesPanel } from "./CookiesPanel"

type TabId = "profile" | "cookies"

const NAV: { id: TabId; label: string; icon: typeof UserIcon }[] = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "cookies", label: "Cookies", icon: Cookie },
]

export function Account() {
  const { data: user, isLoading, isError } = useCurrentUser()
  const [tab, setTab] = useState<TabId>("profile")

  if (isLoading)
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    )
  if (isError || !user)
    return (
      <p className="py-24 text-center text-muted-foreground">
        Couldn't load your profile.
      </p>
    )

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:gap-14">
      <aside className="md:sticky md:top-6 md:h-fit md:w-56 md:shrink-0">
        <h2 className="mb-5 text-xl font-semibold">Settings</h2>
        <p className="mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Account
        </p>
        <div className="flex gap-1 md:flex-col">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                tab === id
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {tab === "profile" && <ProfilePanel user={user} />}
        {tab === "cookies" && <CookiesPanel />}
      </div>
    </div>
  )
}
