import { API } from ".."
import { MeasuringHistoryDTO } from "../../../share/models/measuringHistory"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getMeasurings: build.query<MeasuringHistoryDTO[], { farmId?: string }>({
      query: ({ farmId }) => ({
        url: `/measuring-history/${farmId}`,
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
