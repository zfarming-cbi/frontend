import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query GetLocations {
    users {
      name
      username
      email
      avatar
    }
  }
`
