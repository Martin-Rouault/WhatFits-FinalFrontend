import { Navigate, Outlet } from "react-router"
import { useCurrentUser } from "@/lib/hooks/auth/useCurrentUser"
import Loader from "./layout/Loader"

export function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) return <Loader />
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
