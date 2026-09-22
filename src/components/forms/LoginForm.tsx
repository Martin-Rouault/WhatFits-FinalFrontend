import type { LoginPayload } from "@/types/auth"

import { Button } from "../motion/button"
import { useLogin } from "@/lib/hooks/auth/useLogin"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { isAxiosError } from "axios"
import { NavLink } from "react-router"

export function LoginForm() {
  const { register, handleSubmit, getValues } = useForm<LoginPayload>()

  const navigate = useNavigate()

  const { mutate, isPending, error } = useLogin()

  function onSubmit(data: LoginPayload) {
    mutate(data, {
      onSuccess: () => navigate("/feed"),
    })
  }
  return (
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

      <NavLink
        to={"/forgot-password"}
        className="flex text-sm text-muted-foreground underline hover:text-neutral-800"
      >
        Forgot passord ?
      </NavLink>

      {isAxiosError(error) && (
        <p className="text-sm text-red-500">
          {error.response?.data?.message ??
            "An error has occured, please try again"}
        </p>
      )}

      {isAxiosError(error) && error.response?.status === 403 ? (
        <Button
          type="button"
          onClick={() =>
            navigate("/email-verification", {
              state: { email: getValues("email") },
            })
          }
          className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Verify my email
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Loading..." : "Sign in"}
        </Button>
      )}
    </form>
  )
}
