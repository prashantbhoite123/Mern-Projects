import { configureStore } from "@reduxjs/toolkit"
import userReduser from "../App/Feature/userSlice"

export const store = configureStore({
  reducer: {
    user: userReduser,
  },
})
