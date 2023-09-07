import { API } from ".."
import { PlantDTO } from "../../../share/models/plant"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getPlants: build.query<PlantDTO[], void>({
      query: () => ({
        url: "/plants",
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
  }),
  overrideExisting: false,
})

export const { useGetPlantsQuery, useCreatePlantMutation } = extendedApi
