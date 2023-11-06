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

export interface GetPlantDTO extends PlantDTO {
  image?: string
}

export interface CopyPlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image?: string
}

export interface UpdatePlantDTO {
  id?: string
  name: string
  content: string
  public?: boolean
  image?: Blob | string
}
