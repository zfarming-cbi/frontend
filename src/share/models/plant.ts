export interface PlantDTO {
  id?: string
  name: string
  content: string
  growing_time: string
  public: boolean
  image: string
  likes?: []
  comments?: []
}
