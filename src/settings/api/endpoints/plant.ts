import { API } from ".."
import { PaginationDTO } from "../../../share/models/pagination"
import { CopyPlantDTO, PlantDTO } from "../../../share/models/plant"

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
      query: ({ name, content, growing_time, public: isPublic, image }) => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("content", content)
        formData.append("growing_time", growing_time)
        formData.append("public", JSON.stringify(isPublic))
        image && formData.append("files", image)
        return {
          url: "/plants",
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: ["Plant"],
    }),
    copyPlant: build.mutation<PlantDTO, CopyPlantDTO>({
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
  useCopyPlantMutation,
} = extendedApi
