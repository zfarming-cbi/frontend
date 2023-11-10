import { API } from ".."
import { CommentDTO } from "../../../share/models/comment"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<CommentDTO[], { plantId: string }>({
      query: ({ plantId }) => ({
        url: `/comment-plant/${plantId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      providesTags: ["Comments", "Plant"],
    }),
    createComment: build.mutation<CommentDTO, CommentDTO>({
      query: (body) => ({
        url: "/comment-plant",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
      invalidatesTags: ["Comments", "Plant"],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCommentsQuery, useCreateCommentMutation } = extendedApi
