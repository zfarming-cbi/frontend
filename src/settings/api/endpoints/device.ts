import { API } from ".."
import {
  DeviceDTO,
  DeviceInputDTO,
  UpdateDeviceDTO,
} from "../../../share/models/device"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getDevices: build.query<DeviceDTO[], DeviceInputDTO>({
      query: ({ farmId }) => ({
        url: `/device/all/${farmId}`,
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
  }),
  overrideExisting: false,
})

export const {
  useGetDevicesQuery,
  useCreateDevicesMutation,
  useUpdateDeviceMutation,
} = extendedApi
