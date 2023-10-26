import { API } from ".."
import { LikeDTO } from "../../../share/models/like"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getLikes: build.query<LikeDTO[], { plantId: string }>({
      query: ({ plantId }) => ({
        url: `/like-plant/${plantId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Likes"],
    }),
    getLike: build.query<LikeDTO, { plantId: string; userId: string }>({
      query: ({ plantId, userId }) => ({
        url: `/like-plant/${plantId}/${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Likes"],
    }),
    createLike: build.mutation<LikeDTO, LikeDTO>({
      query: (body) => ({
        url: "/like-plant",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Likes"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetLikesQuery,
  useCreateLikeMutation,
  useGetLikeQuery,
  useLazyGetLikeQuery,
} = extendedApi
