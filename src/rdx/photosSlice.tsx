import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export type PhotoType = {
  [key:string]: any
}
export type PhotoStateType = {
  data: []|PhotoType[],
  loading: boolean
}
const initialState: PhotoStateType = {
  data: [],
  loading: false
}


export const fetchPhotosAsync = createAsyncThunk<PhotoType[], string>(
  "photos/fetchPhotos",
  async (url: string, { rejectWithValue }):Promise<PhotoType[]> => {
    try {
      const response = await axios.get(`${url}`);
      console.log(response.data.results);
      
      return response.data.results;
    } catch (error: any) {
      const errorMessage: string = error.response.data.message || "Unknown error";
      rejectWithValue(errorMessage);
      return []
    }
  }
);


export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updatePhotosState: (state, action: PayloadAction<PhotoType[]>) =>{
      state.data = action.payload
      console.log(state.data)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosAsync.fulfilled, (state, action: PayloadAction<PhotoType[]>) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(fetchPhotosAsync.rejected, (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    })
    builder.addCase(fetchPhotosAsync.pending, (state) => {        
      state.loading = true
    })
  }
})


export const { updatePhotosState } = photosSlice.actions

export default photosSlice.reducer