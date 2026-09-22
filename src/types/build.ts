export type BuildPhoto = {
  url: string
  order: number
}

export type Build = {
  id: number
  user: { id: number; name: string }
  car_model: { id: number; name: string; make: string }
  wheel: { id: number; name: string; brand: string }
  car_year: number
  diameter: number
  width: number
  likes_count: number
  liked: boolean
  photos: BuildPhoto[]
  created_at: string
}

export type Like = {
  liked: boolean
  likes_count: number
}
