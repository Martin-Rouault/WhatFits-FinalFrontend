import { Link } from "react-router"
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a link to reset your
            password.
          </p>
        </div>
        <ForgotPasswordForm />
        <Link
          to="/login"
          className="block text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
