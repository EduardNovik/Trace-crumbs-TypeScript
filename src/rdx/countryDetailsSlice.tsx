import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type CountryDetailsType = {
  [key:string]: any
}

export type CountryDetailsStateType = {
  data:CountryDetailsType
}

const initialState: CountryDetailsStateType = {
  data: {},
}


export const countryDetailsSlice = createSlice({
  name: 'countryDetails',
  initialState,
  reducers: {
    updateCountryDetailsState: (state, action: PayloadAction<CountryDetailsType>) =>{    
      console.log(action.payload);
      
      state.data = action.payload
    }
  }
})


 
export const { updateCountryDetailsState } = countryDetailsSlice.actions

export default countryDetailsSlice.reducer
