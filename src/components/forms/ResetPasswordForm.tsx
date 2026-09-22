import { useResetPassword } from "@/lib/hooks/password/useResetPassword"

import { isAxiosError } from "axios"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams, useNavigate } from "react-router"

type ResetPayload = { password: string; password_confirmation: string }

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPayload>()

  const [searchParams] = useSearchParams()

  const token = searchParams.get("token") ?? ""
  const email = searchParams.get("email") ?? ""

  const navigate = useNavigate()

  const { mutate, isPending, isSuccess, error } = useResetPassword()

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  function onSubmit(data: ResetPayload) {
    mutate({
      token,
      email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
  }
  return (
    <div>
      {!token || !email ? (
        <p className="text-center text-sm text-red-500">
          Invalid link. Request a new one from "Forgot password".
        </p>
      ) : isSuccess ? (
        <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-600">
          Password updated ✅ Redirecting to sign in…
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For <span className="font-medium text-foreground">{email}</span>
          </p>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              {...register("password", { required: true, minLength: 15 })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                15 characters minimum.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="mb-2 block text-sm font-medium"
            >
              Confirm password
            </label>
            <input
              id="password_confirmation"
              type="password"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              {...register("password_confirmation", {
                required: true,
                validate: (value) =>
                  value === watch("password") ||
                  "Passwords do not match",
              })}
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {isAxiosError(error) && (
            <p className="text-sm text-red-500">
              {error.response?.data?.message ??
                "The link is invalid or has expired."}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Reset password"}
          </button>
        </form>
      )}
    </div>
  )
}
