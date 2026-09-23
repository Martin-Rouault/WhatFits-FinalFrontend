import { useForm } from "react-hook-form"
import type { RegisterPayload } from "@/types/auth"
import { useRegister } from "@/lib/hooks/auth/useRegister"
import { useNavigate } from "react-router"
import { isAxiosError } from "axios"

export function SignUpForm() {
  const { register, handleSubmit } = useForm<RegisterPayload>()

  const navigate = useNavigate()

  const { mutate, isPending, error } = useRegister()

  function onSubmit(data: RegisterPayload) {
    mutate(data, {
      onSuccess: () =>
        navigate("/email-verification", { state: { email: data.email } }),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          {...register("name", { required: true })}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          {...register("email", { required: true })}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
          {...register("password", { required: true })}
        />
      </div>

      {isAxiosError(error) && (
        <div className="space-y-1">
          {Object.values(error.response?.data?.errors ?? {})
            .flat()
            .map((message, index) => (
              <p key={index} className="text-sm text-red-500">
                {message as string}
              </p>
            ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        {isPending ? "Creating..." : "Sign up"}
      </button>
    </form>
  )
}
