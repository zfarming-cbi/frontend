import { API } from ".."
import {
  ChangePasswordDTO,
  ForgotDTO,
  LoginDTO,
  RecoverPasswordDTO,
  RecoverPasswordScreenDTO,
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
    forgot: build.mutation<void, ForgotDTO>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    verifyUuid: build.query<void, RecoverPasswordScreenDTO>({
      query: ({ uuid }) => ({
        url: `/auth/recover-password/${uuid}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    resetPassowrd: build.mutation<void, RecoverPasswordDTO>({
      query: (body) => ({
        url: "/auth/recover-password",
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    changePassowrd: build.mutation<void, ChangePasswordDTO>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PATCH",
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

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotMutation,
  useResetPassowrdMutation,
  useChangePassowrdMutation,
  useVerifyUuidQuery,
} = extendedApi
