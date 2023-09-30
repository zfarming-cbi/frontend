export interface PlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image?: string
  updatedAt?: string
  likes?: []
  comments?: []
  devices?: []
}
