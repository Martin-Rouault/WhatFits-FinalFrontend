import { useForm } from "react-hook-form"
import { useForgotPassword } from "@/lib/hooks/password/useForgotPassword"

type ForgotPayload = { email: string }

export default function ForgotPasswordForm() {
  const { register, handleSubmit } = useForm<ForgotPayload>()

  const { mutate, isPending, isSuccess, isError } = useForgotPassword()

  function onSubmit(data: ForgotPayload) {
    mutate(data.email)
  }
  return (
    <div>
      {isSuccess ? (
        <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-600">
          If this email matches an account, a reset link has just been
          sent. Check your spam folder too.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              {...register("email", { required: true })}
            />
          </div>

          {isError && (
            <p className="text-sm text-red-500">
              Something went wrong, please try again later.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send the link"}
          </button>
        </form>
      )}
    </div>
  )
}
