import { API } from ".."
import { PaginationDTO } from "../../../share/models/pagination"
import { PqrsDTO } from "../../../share/models/pqrs"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query<PqrsDTO[], PaginationDTO>({
      query: ({ page, perPage, search }) => ({
        url: `/pqrs?search=${search}&page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Pqrs"],
    }),
    getPqrs: build.query<PqrsDTO, { pqrsId?: string }>({
      query: ({ pqrsId }) => ({
        url: `/pqrs/${pqrsId}`,
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
    updatePqrs: build.mutation<PqrsDTO, PqrsDTO & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/pqrs/${id}`,
        method: "PATCH",
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

export const {
  useGetTicketsQuery,
  useLazyGetTicketsQuery,
  useCreatePqrsMutation,
  useUpdatePqrsMutation,
} = extendedApi
