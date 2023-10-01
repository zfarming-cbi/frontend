import { API } from ".."
import { PaginationDTO } from "../../../share/models/pagination"
import { PlantDTO } from "../../../share/models/plant"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getPlants: build.query<PlantDTO[], PaginationDTO>({
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
    getPlant: build.query<PlantDTO, { plantId?: string }>({
      query: ({ plantId }) => ({
        url: `/plants/${plantId}`,
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
    getPlantsForGalery: build.query<PlantDTO[], PaginationDTO>({
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
  useGetPlantQuery,
  useGetPlantsQuery,
  useCreatePlantMutation,
  useGetPlantsForGaleryQuery,
} = extendedApi
