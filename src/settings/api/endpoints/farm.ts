import { API } from ".."
import { FarmDTO, FarmForAsignedDTO } from "../../../share/models/farm"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getFarms: build.query<FarmDTO[], { search?: string | number }>({
      query: ({ search }) => ({
        url: `/farms?option=${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Farm"],
    }),
    // getFarmsForAsigned: build.query<FarmForAsignedDTO[], { userId?: string }>({
    //   query: ({ userId }) => ({
    //     url: `/farms/user-asigned/${userId}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       accept: "application/json",
    //     },
    //   }),
    //   providesTags: ["Farm"],
    // }),
    getFarm: build.query<FarmDTO, { farmId?: string }>({
      query: ({ farmId }) => ({
        url: `/farms/${farmId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Farm"],
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
      invalidatesTags: ["Farm"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetFarmQuery,
  useLazyGetFarmQuery,
  useLazyGetFarmsQuery,
  useGetFarmsQuery,
  useCreateFarmMutation,
} = extendedApi
