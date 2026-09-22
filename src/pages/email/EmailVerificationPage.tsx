import { useLocation, Link } from "react-router"
import { MailCheck } from "lucide-react"
import { useResendVerification } from "@/lib/hooks/email/useResendVerification"

export default function EmailVerificationPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email
  const { mutate, isPending, isSuccess, isError } = useResendVerification()

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Check your inbox</h1>
          <p className="text-muted-foreground">
            We sent a verification link
            {email ? (
              <>
                {" "}
                to <span className="font-medium text-foreground">{email}</span>
              </>
            ) : null}
            . Click it to activate your account.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => email && mutate(email)}
            disabled={isPending || !email}
            className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Resend email"}
          </button>

          {isSuccess && (
            <p className="text-sm text-emerald-600">Email resent ✅</p>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              Couldn't resend right now, please try again later.
            </p>
          )}
          {!email && (
            <p className="text-sm text-muted-foreground">
              Landed here directly?{" "}
              <Link to="/login" className="text-primary underline">
                Sign in
              </Link>{" "}
              to get a new link.
            </p>
          )}
        </div>

        <Link
          to="/login"
          className="inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
