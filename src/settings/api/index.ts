import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AppEnvVars } from "../env/environment"
import { RootState } from "../redux/store"

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: AppEnvVars.SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).session.tokenContent
      const token = localStorage.getItem("token")

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Farm", "User"],
  endpoints: () => ({}),
})
