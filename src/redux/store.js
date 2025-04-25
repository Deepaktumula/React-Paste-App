import { configureStore } from '@reduxjs/toolkit'
import { pasteSlice } from './pasteSlice'

export const store = configureStore({
  reducer: {
    pastes: pasteSlice.reducer
  },
})