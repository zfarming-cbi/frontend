import { API } from ".."
import { DeviceDTO, UpdateDeviceDTO } from "../../../share/models/device"
import { PaginationDTO } from "../../../share/models/pagination"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getDevices: build.query<DeviceDTO[], PaginationDTO>({
      query: ({ page, perPage, search }) => ({
        url: `/device/all?search=${search}&page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Device"],
    }),

    getDevicesByFarm: build.query<DeviceDTO[], { farmId?: string }>({
      query: ({ farmId }) => ({
        url: `/device/by-farm/${farmId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Device"],
    }),

    getDevice: build.query<DeviceDTO, { deviceId?: string }>({
      query: ({ deviceId }) => ({
        url: `/device/${deviceId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Device"],
    }),
    getDevicesUnasigned: build.query<DeviceDTO[], void>({
      query: () => ({
        url: `/device`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Device"],
    }),
    createDevices: build.mutation<DeviceDTO, DeviceDTO>({
      query: (body) => ({
        url: "/device",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Device"],
    }),
    updateDevice: build.mutation<DeviceDTO, UpdateDeviceDTO & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/device/${id}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Device"],
    }),
    deleteDevice: build.mutation<DeviceDTO, { id?: string }>({
      query: ({ id }) => ({
        url: `/device/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Device"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetDevicesQuery,
  useLazyGetDevicesQuery,
  useGetDevicesUnasignedQuery,
  useCreateDevicesMutation,
  useUpdateDeviceMutation,
  useGetDeviceQuery,
  useDeleteDeviceMutation,
  useGetDevicesByFarmQuery,
} = extendedApi
