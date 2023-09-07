import { API } from ".."
import { CompanyDTO } from "../../../share/models/company"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    updateCompany: build.mutation<CompanyDTO, CompanyDTO>({
      query: (body) => ({
        url: "/company",
        method: "PATCH",
        body,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }),
    }),
    getCompany: build.query<CompanyDTO, void>({
      query: (body) => ({
        url: "/company",
        method: "GET",
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

export const { useUpdateCompanyMutation, useGetCompanyQuery } = extendedApi
