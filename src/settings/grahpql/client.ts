import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { AppEnvVars } from "../env/environment"
import { AuthenticationRecoverHandler } from "../routes/authentication.loader"

const httpLink = new HttpLink({ uri: AppEnvVars.SERVER_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = AuthenticationRecoverHandler()
  operation.setContext({
    headers: {
      authorization: token,
    },
  })
  return forward(operation)
})

export const API_CLIENT = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})
