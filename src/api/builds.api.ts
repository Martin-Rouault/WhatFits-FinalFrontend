import { api } from "@/config/axios-config"
import type { Build, Like } from "@/types/build"

export const getBuilds = async (): Promise<Build[]> => {
  const response = await api.get("/builds")
  return response.data.data
}

export const likeBuild = async (build: number): Promise<Like> => {
  const response = await api.post(`/builds/${build}/like`)
  return response.data
}