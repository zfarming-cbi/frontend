import { API } from ".."
import { PaginationDTO } from "../../../share/models/pagination"
import { UserDTO } from "../../../share/models/user"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      UserDTO[],
      PaginationDTO & { companyId: number | string }
    >({
      query: ({ companyId, search, page, perPage }) => ({
        url: `/user/company/${companyId}?search=${search}&page=${page}&perPage=${perPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["User"],
    }),
    createUser: build.mutation<UserDTO, UserDTO>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<UserDTO, UserDTO>({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
    getUser: build.query<UserDTO, { id: string }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    deleteUser: build.mutation<UserDTO, { id?: string }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
} = extendedApi
