import { API } from ".."
import { PaginationDTO } from "../../../share/models/pagination"
import {
  CopyPlantDTO,
  GetPlantDTO,
  PlantDTO,
  UpdatePlantDTO,
} from "../../../share/models/plant"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getPlants: build.query<PlantDTO[], PaginationDTO>({
      query: ({ page, perPage, search }) => ({
        url: `/plants?search=${search}&page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Plant"],
    }),
    getPlant: build.query<GetPlantDTO, { plantId?: string }>({
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
        formData.append("growing_time", JSON.stringify(growing_time))
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
    updatePlant: build.mutation<PlantDTO, UpdatePlantDTO & { id: string }>({
      query: ({ id, name, content, public: isPublic, image }) => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("content", content)
        formData.append("public", JSON.stringify(isPublic))
        image && formData.append("files", image)
        return {
          url: `/plants/${id}`,
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags: ["Plant"],
    }),
    copyPlant: build.mutation<PlantDTO, CopyPlantDTO>({
      query: (body) => ({
        url: "/plants/copy-plant",
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
      PaginationDTO & { order?: string | number }
    >({
      query: ({ page, perPage, search, order }) => ({
        url: `/plants/galery?search=${search}&order=${order}&page=${page}&perPage=${perPage}`,
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
  useUpdatePlantMutation,
  useGetPlantsForGaleryQuery,
  useLazyGetPlantsForGaleryQuery,
  useCopyPlantMutation,
  useLazyGetPlantsQuery,
} = extendedApi
