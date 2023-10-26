export enum Rol {
  Administrator = "ADMIN",
  Collaborator = "BASIC",
}
export interface JWTContent {
  companyId: number
  email: string
  rol: Rol
  iss: string
  aud: string
  sub: string
  url: string
  tok: string
  exp: number
}

export interface AppSession {
  tokenContent?: JWTContent
  isLogged?: boolean
  email?: string
  companyId?: number
  rol?: Rol
  userId?: string
}
