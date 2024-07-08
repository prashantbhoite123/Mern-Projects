import { configureStore } from "@reduxjs/toolkit"
import userReduser from "../App/Feature/userSlice"
import restoreReduser from "./Feature/restore"

export const store = configureStore({
  reducer: {
    user: userReduser,
    restore: restoreReduser,
  },
})
