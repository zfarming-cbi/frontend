import { API } from ".."
import { UserDTO } from "../../../share/models/user"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserDTO[], { companyId: number }>({
      query: ({ companyId }) => ({
        url: `/user/company/${companyId}`,
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
      query: (body) => ({
        url: "/user",
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
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = extendedApi
