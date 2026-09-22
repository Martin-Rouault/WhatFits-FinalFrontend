import { Routes, Route } from "react-router"

import { AppShaderBackground } from "./components/layout/ShaderBackground"
import Navbar from "./components/layout/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import SignUpPage from "./pages/auth/SignUpPage"
import NotFoundPage from "./pages/NotFoundPage"
import AccountPage from "./pages/AccountPage"
import FeedPage from "./pages/FeedPage"
import EmailVerificationPage from "./pages/email/EmailVerificationPage"
import VerifyEmailPage from "./pages/email/VerifyEmailPage"
import { ProtectedRoute } from "./components/ProtectedRoute"
import ForgotPasswordPage from "./pages/password/ForgotPasswordPage"
import ResetPasswordPage from "./pages/password/ResetPasswordPage"

export function App() {
  return (
    <>
      <AppShaderBackground />

      <header className="mx-auto max-w-7xl">
        <Navbar />
      </header>

      <main className="mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          />
          <Route path="/email/verify/:id/:hash" element={<VerifyEmailPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <footer className="mx-auto max-w-7xl"></footer>
    </>
  )
}

export default App
