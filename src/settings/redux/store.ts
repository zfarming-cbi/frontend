/*
Can still subscribe to the store
    store.subscribe(() => console.log(store.getState()))

Still pass action objects to `dispatch`, but they're created for us
    store.dispatch(incremented())
        {value: 1}
    store.dispatch(incremented())
        {value: 2}
    store.dispatch(decremented())
        {value: 1}
*/

import { configureStore } from "@reduxjs/toolkit"
import { dialogsSlice } from "./dialogs.slice"
import { sessionSlice } from "./session.slice"

export const ReduxStore = configureStore({
  reducer: {
    [dialogsSlice.name]: dialogsSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
  },
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch
