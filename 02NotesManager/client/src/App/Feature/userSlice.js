import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : null,
  loading: false,
}

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
    },
    fetchFail: (state, action) => {
      state.loading = false
    },
    fetchSuccess: (state, action) => {
      state.currentUser = action.payload
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },
    logoutUser: () => {
      sessionStorage.clear()
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },
  },
})

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  logoutUser,
  updateSuccess,
} = userSlice.actions

export default userSlice.reducer
