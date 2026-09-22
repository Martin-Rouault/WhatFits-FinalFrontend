import { SignUpForm } from "@/components/forms/SignUpForm";

export function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-3xl font-bold">Sign up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
