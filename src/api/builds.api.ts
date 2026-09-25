import { api } from "@/config/axios-config"
import type { Build, Like } from "@/types/build"

export const getBuilds = async (): Promise<Build[]> => {
  const response = await api.get("/builds")
  return response.data.data
}

export const getBuild = async (id: number): Promise<Build> => {
  const response = await api.get(`/builds/${id}`)
  return response.data.data
}

export const likeBuild = async (id: number): Promise<Like> => {
  const response = await api.post(`/builds/${id}/like`)
  return response.data
}