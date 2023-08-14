export interface JWTContent {
  start: Date
  company: string
  company_id: string
  company_logo: string
  url_app: string
  user_id: number
  email: string
  perfil: string
  perfil_id: number
  perfil_ident: string
  code: number
  tipo: "web" | "app"
  culture: "es"
  persona_id: number
  nombre_usuario: string
  sede_id: number
  sede: string
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
  username?: string
  email?: string
}
