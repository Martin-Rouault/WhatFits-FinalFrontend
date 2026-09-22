import { useEffect } from "react"
import { useParams, useSearchParams, useNavigate, Link } from "react-router"
import { isAxiosError } from "axios"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { useVerifyEmail } from "@/lib/hooks/email/useVerifyEmail"

export default function VerifyEmailPage() {
  const { id, hash } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { isLoading, isSuccess, isError, error } = useVerifyEmail({
    id,
    hash,
    expires: searchParams.get("expires") ?? undefined,
    signature: searchParams.get("signature") ?? undefined,
  })

  const alreadyVerified = isAxiosError(error) && error.response?.status === 400
  const verified = isSuccess || alreadyVerified

  // Redirect to sign in automatically after verification
  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => navigate("/login"), 2500)
      return () => clearTimeout(timer)
    }
  }, [verified, navigate])

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4 text-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="size-7 animate-spin" />
            <p>Verifying…</p>
          </div>
        )}

        {verified && (
          <>
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-7" />
            </div>
            <h1 className="text-2xl font-bold">Email verified</h1>
            <p className="text-muted-foreground">
              {alreadyVerified
                ? "Your account was already activated."
                : "Your account is activated."}{" "}
              Redirecting to sign in…
            </p>
            <Link to="/login" className="text-primary underline">
              Sign in now
            </Link>
          </>
        )}

        {isError && !alreadyVerified && (
          <>
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-600">
              <XCircle className="size-7" />
            </div>
            <h1 className="text-2xl font-bold">Invalid or expired link</h1>
            <p className="text-muted-foreground">
              This verification link is no longer valid. Request a new
              link from the sign-in page.
            </p>
            <Link to="/login" className="text-primary underline">
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
