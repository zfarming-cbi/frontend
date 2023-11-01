import { FarmForAsignedDTO } from "./farm"

export interface UserDTO {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
  rol?: string | number
  farms?: FarmForAsignedDTO[]
}
