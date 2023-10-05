export interface PlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image?: Blob
  updatedAt?: string
  likes?: []
  comments?: []
  devices?: []
}
export interface CopyPlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image?: string
}
