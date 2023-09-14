export interface SignupDTO {
  company: string
  nit: string
  firstname: string
  lastname: string
  email: string
  password: string
}
export interface LoginDTO {
  email: string
  password: string
}

export interface ForgotDTO {
  email: string
}

export interface RecoverPasswordDTO {
  password: string
}

export interface TokenDTO {
  access_token: string
}
