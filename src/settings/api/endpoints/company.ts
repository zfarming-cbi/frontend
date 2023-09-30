import { API } from ".."
import { CompanyDTO } from "../../../share/models/company"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    updateCompany: build.mutation<
      CompanyDTO,
      CompanyDTO & { companyId: number }
    >({
      query: ({ companyId, ...body }) => ({
        url: `/company/${companyId}`,
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    getCompany: build.query<CompanyDTO, { companyId: number }>({
      query: ({ companyId }) => ({
        url: `/company/${companyId}`,
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

export const { useUpdateCompanyMutation, useGetCompanyQuery } = extendedApi
