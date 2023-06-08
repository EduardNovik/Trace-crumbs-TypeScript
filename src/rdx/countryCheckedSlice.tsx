import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CheckedDataType = {
  [key:string]:boolean
}

export type CheckedStatusType = {
  data: CheckedDataType | Record<string, never>
}

const initialState: CheckedStatusType = {
  data: {}
}


export const countryCheckedSlice = createSlice({
  name: 'countryChecked',
  initialState,
  reducers: {
    updateCountryCheckedState: (state, action: PayloadAction<CheckedDataType>) =>{
      state.data = action.payload
    }
  }
})


 
export const { updateCountryCheckedState } = countryCheckedSlice.actions

export default countryCheckedSlice.reducer
