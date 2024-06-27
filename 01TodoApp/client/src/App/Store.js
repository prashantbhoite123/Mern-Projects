import { configureStore } from "@reduxjs/toolkit"
import userReduser from "./Feature/TodoSlice"

export const store = configureStore({
  reducer: {
    user: userReduser,
  },
})
