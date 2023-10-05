import { API } from ".."
import { MeasuringHistoryDTO } from "../../../share/models/measuringHistory"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getMeasurings: build.query<MeasuringHistoryDTO[], { deviceId?: string }>({
      query: ({ deviceId }) => ({
        url: `/measuring-history/${deviceId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetMeasuringsQuery } = extendedApi
