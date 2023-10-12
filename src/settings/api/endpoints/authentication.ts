import { API } from ".."
import {
  ChangePasswordDTO,
  ForgotDTO,
  LoginDTO,
  RecoverPasswordDTO,
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
    verifyUuid: build.query<boolean, { uuid?: string }>({
      query: ({ uuid }) => ({
        url: `/auth/recover-password-screen/${uuid}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    resetPassword: build.mutation<
      TokenDTO,
      RecoverPasswordDTO & { uuid?: string }
    >({
      query: ({ uuid, ...body }) => ({
        url: `/auth/recover-password/${uuid}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    changePassowrd: build.mutation<void, ChangePasswordDTO & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/auth/change-password/${id}`,
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
  useResetPasswordMutation,
  useChangePassowrdMutation,
  useVerifyUuidQuery,
} = extendedApi
