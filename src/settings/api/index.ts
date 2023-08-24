import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppEnvVars } from "../env/environment"

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({ baseUrl: AppEnvVars.SERVER_URL }),
  endpoints: () => ({}),
})
