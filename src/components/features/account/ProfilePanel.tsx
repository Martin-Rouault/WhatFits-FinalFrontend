import { Trash2 } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { Me } from "@/types/user"

export function ProfilePanel({ user }: { user: Me }) {
  const initials = user.name.slice(0, 2).toUpperCase()

  return (
    <section className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted-foreground">Manage your account information.</p>
      </header>

      <div className="flex items-center gap-5">
        <Avatar className="size-16">
          <AvatarFallback className="bg-muted text-lg font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <p className="text-sm font-medium">{user.name}</p>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-6">
        <Field label="Username" hint="Your username can't be changed.">
          <ReadOnlyInput value={user.name} />
        </Field>
        <Field label="Email" hint="The address linked to your account.">
          <ReadOnlyInput value={user.email} />
        </Field>
      </div>

      <div className="h-px bg-border" />

      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <Trash2 className="size-4" />
          Delete my account
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This action is permanent. All your data will be deleted and cannot
              be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Back</DialogClose>
            <Button className="bg-destructive text-white hover:bg-destructive/90">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-6">
      <label className="pt-2 text-sm font-medium">{label}</label>
      <div className="space-y-1.5">
        {children}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  )
}

function ReadOnlyInput({ value }: { value: string }) {
  return (
    <input
      value={value}
      readOnly
      className="w-full rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm text-foreground focus:outline-none"
    />
  )
}
