import { LoginForm } from "@/components/forms/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-3xl font-bold">Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
