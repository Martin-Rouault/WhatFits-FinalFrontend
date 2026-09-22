import ResetPasswordForm from "@/components/forms/ResetPasswordForm"
import { Link } from "react-router"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-3xl font-bold">New password</h1>
        <ResetPasswordForm />
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
