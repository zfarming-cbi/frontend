import { API } from ".."
import {
  MeasuringHistoryAverageDTO,
  MeasuringHistoryDTO,
} from "../../../share/models/measuringHistory"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getMeasurings: build.query<MeasuringHistoryDTO, { deviceId?: string }>({
      query: ({ deviceId }) => ({
        url: `/measuring-history/${deviceId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    getMeasuringsAverage: build.query<
      MeasuringHistoryAverageDTO,
      { deviceId?: string }
    >({
      query: ({ deviceId }) => ({
        url: `/measuring-history/average/${deviceId}`,
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

export const { useGetMeasuringsQuery, useGetMeasuringsAverageQuery } =
  extendedApi
