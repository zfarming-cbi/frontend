import { API } from ".."
import {
  LoginDTO,
  SignupDTO,
  TokenDTO,
} from "../../../share/models/authentication"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<TokenDTO, SignupDTO>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    login: build.mutation<TokenDTO, LoginDTO>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSignupMutation, useLoginMutation } = extendedApi
