import { API } from ".."
import { DeviceDTO, DeviceInputDTO } from "../../../share/models/device"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getDevices: build.query<DeviceDTO[], DeviceInputDTO>({
      query: ({ farmid }) => ({
        url: `/device/all/${farmid}`,
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
  }),
  overrideExisting: false,
})

export const { useGetDevicesQuery, useCreateDevicesMutation } = extendedApi
