import { configureStore } from "@reduxjs/toolkit"
import { dialogsSlice } from "./dialogs.slice"
import { sessionSlice } from "./session.slice"
import { API } from "../api"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { dataFilterSlice } from "./dataFilter.slice"

export const ReduxStore = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    [dialogsSlice.name]: dialogsSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [dataFilterSlice.name]: dataFilterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
})
setupListeners(ReduxStore.dispatch)
export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
