import { API } from ".."
import { TokenDTO } from "../../../share/models/authentication"
import { FarmDTO } from "../../../share/models/farm"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getFarms: build.query<FarmDTO[], void>({
      query: () => ({
        url: "/farms",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    createFarm: build.mutation<FarmDTO, FarmDTO>({
      query: (body) => ({
        url: "/farms",
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

export const { useGetFarmsQuery, useCreateFarmMutation } = extendedApi
