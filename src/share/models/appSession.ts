export interface JWTContent {
  email: string
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
}
