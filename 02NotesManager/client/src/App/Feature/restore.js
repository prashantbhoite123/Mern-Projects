import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  restroearr: [],
}

const restoreSlice = createSlice({
  name: "restore",
  initialState,
  reducers: {
    restorenots: (state, action) => {
      state.restroearr = action.payload
    },
  },
})

export const { restorenots } = restoreSlice.actions

export default restoreSlice.reducer
