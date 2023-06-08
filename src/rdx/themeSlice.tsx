import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export type ThemeStateDataType  = 'dark'|'light'

export type ThemeStateType = {
  data: ThemeStateDataType, 
  checkedStatus: boolean
}

const initialState: ThemeStateType = {
  data: 'light',
  checkedStatus: true
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<ThemeStateDataType>) =>{
      state.data = action.payload
    },
    updateCheckedStatus: (state, action: PayloadAction<boolean>) =>{
      state.checkedStatus = action.payload
    }
  }
})

 
export const { updateState, updateCheckedStatus } = themeSlice.actions

export default themeSlice.reducer


