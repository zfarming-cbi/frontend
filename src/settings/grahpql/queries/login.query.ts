import { gql } from "@apollo/client"

export const LOG_IN = gql`
  query Login($credential: LoginCredential!) {
    login(credential: $credential) {
      token
      success
      msg
      code
    }
  }
`
