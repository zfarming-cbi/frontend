import { API } from ".."
import { PqrsDTO } from "../../../share/models/pqrs"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query<PqrsDTO[], { page: string; perPage: string }>({
      query: ({ page, perPage }) => ({
        url: `/pqrs?page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Pqrs"],
    }),
    createPqrs: build.mutation<PqrsDTO, PqrsDTO>({
      query: (body) => ({
        url: "/pqrs",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Pqrs"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetTicketsQuery, useCreatePqrsMutation } = extendedApi
