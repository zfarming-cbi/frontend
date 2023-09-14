import JWT from "jwt-decode"
import { redirect } from "react-router-dom"
import { ReduxStore } from "../redux/store"
import { logIn, logout } from "../redux/session.slice"
import { JWTContent } from "../../share/models/appSession"
import { ROUTE_PATH } from "./routes"

export const AuthenticationLessRouteLoader = () => {
  const token = localStorage.getItem("token") ?? ""
  if (!token) {
    return null
  }
  localStorage.clear()
  ReduxStore.dispatch(logout())
  return null
}

export const AuthenticationRouteLoader = () => {
  const token = localStorage.getItem("token") ?? ""
  if (!token) {
    ReduxStore.dispatch(logout())
    return redirect(ROUTE_PATH.Login)
  }
  const tokenInfo = JWT<JWTContent>(token)
  const isTokenExpired = tokenInfo.exp < Date.now() / 1000

  if (!tokenInfo?.email || isTokenExpired) {
    localStorage.clear()
    ReduxStore.dispatch(logout())
    return redirect(ROUTE_PATH.Login)
  }

  ReduxStore.dispatch(
    logIn({
      isLogged: true,
      email: tokenInfo.email,
      // tokenContent: tokenInfo,
    })
  )

  return null
}

export const AuthenticationSaveHandler = (token: string): boolean => {
  try {
    const tokenInfo = JWT<JWTContent>(token)
    if (!tokenInfo?.email) {
      localStorage.clear()
      ReduxStore.dispatch(logout())
      return false
    }
    localStorage.setItem("token", token)
    ReduxStore.dispatch(
      logIn({
        isLogged: true,
        email: tokenInfo.email,
      })
    )
    return true
  } catch (error) {
    localStorage.clear()
    ReduxStore.dispatch(logout())
    return false
  }
}

export const AuthenticationRecoverHandler = (): string | undefined => {
  const token = localStorage.getItem("token") ?? undefined
  return token
}

export const AuthenticationResetHandler = () => {
  localStorage.clear()
  ReduxStore.dispatch(logout())
  location.replace(ROUTE_PATH.Login)
}
