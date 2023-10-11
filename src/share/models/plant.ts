export interface PlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image?: Blob | string
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
