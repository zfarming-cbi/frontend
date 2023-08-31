import { API } from ".."
import { UserDTO } from "../../../share/models/user"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserDTO[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    createUsers: build.mutation<UserDTO, UserDTO>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetUsersQuery, useCreateUsersMutation } = extendedApi
