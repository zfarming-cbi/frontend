import { API } from ".."
import { CompanyDTO } from "../../../share/models/company"

const extendedApi = API.injectEndpoints({
  endpoints: (build) => ({
    updateCompany: build.mutation<
      CompanyDTO,
      CompanyDTO & { companyId: number }
    >({
      query: ({ companyId, name, nit, logo }) => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("nit", nit)
        console.log(">>>Logo desde el rkt", logo)

        logo && formData.append("files", logo)
        console.log("FORMDATA desde el rtk", formData)
        return {
          url: `/company/${companyId}`,
          method: "POST",
          body: formData,
        }

        // url: `/company/${companyId}`,
        // method: "PATCH",
        // body,
        // headers: {
        //   "Content-Type": "application/json",
        //   accept: "application/json",
        // },
      },
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
