import { API } from ".."
import { CompanyDTO } from "../../../share/models/company"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    updateCompany: build.mutation<
      CompanyDTO,
      CompanyDTO & { companyId: number | string }
    >({
      query: ({ companyId, name, nit, logo }) => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("nit", nit)
        logo && formData.append("files", logo)
        return {
          url: `/company/${companyId}`,
          method: "POST",
          body: formData,
        }
      },
    }),
    getCompany: build.query<CompanyDTO, { companyId: number | string }>({
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
