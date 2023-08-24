export interface SignupDTO {
  name: string
  nit: string
  firstname: string
  lastname: string
  username: string
  password: string
}
export interface LoginDTO {
  username: string
  password: string
}

export interface TokenDTO {
  access_token: string
}
