import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : null,
  loading: false,
  deleteToggle: false,
  searchNotes: [],
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
    toggleDelete: (state, action) => {
      state.deleteToggle = !state.deleteToggle
    },

    storeSeachNote: (state, action) => {
      state.searchNotes = action.payload
    },
  },
})

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  logoutUser,
  updateSuccess,
  toggleDelete,
  storeSeachNote,
} = userSlice.actions

export default userSlice.reducer
