import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export type CountriesInfoDataType = {
  [key:string]: any
}

type CountriesInfoType = {
  data:CountriesInfoDataType[]|[],
  loading: boolean
}

const initialState: CountriesInfoType = {
  data: [],
  loading: false
}


export const fetchCountriesAsync = createAsyncThunk(
  "countries/fetchCountries",
  async (url: string, { rejectWithValue }): Promise<CountriesInfoDataType[]> => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error: any) {
      const errorMessage: string = error.response.data.message || 'Unknown error';
      rejectWithValue(errorMessage);
      return []
    }
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<CountriesInfoDataType[]>) => {
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesAsync.fulfilled, (state, action: PayloadAction<CountriesInfoDataType[]>) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchCountriesAsync.rejected, (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    })
    builder.addCase(fetchCountriesAsync.pending, (state) => {        
      state.loading = true
    })
  }
})



export const { updateState } = countriesSlice.actions

export default countriesSlice.reducer