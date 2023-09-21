import { API } from ".."
import { PlantDTO } from "../../../share/models/plant"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getPlants: build.query<PlantDTO[], { page: string; perPage: string }>({
      query: ({ page, perPage }) => ({
        url: `/plants?page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Plant"],
    }),
    createPlant: build.mutation<PlantDTO, PlantDTO>({
      query: (body) => ({
        url: "/plants",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Plant"],
    }),
    getPlantsForGalery: build.query<
      PlantDTO[],
      { page: string; perPage: string }
    >({
      query: ({ page, perPage }) => ({
        url: `/plants/galery?page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Plant"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPlantsQuery,
  useCreatePlantMutation,
  useGetPlantsForGaleryQuery,
} = extendedApi
