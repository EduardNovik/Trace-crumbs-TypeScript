import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export type SignInDataType = {[key:string]:any}|null

export type SingInType = {
  data: SignInDataType,
  profileId: null|string
}

const initialState: SingInType = {
  data: null,
  profileId: null
}


export const fetchGoogleAccount = createAsyncThunk(
  'signIn/fetchGoogleAccount',
 async  ( token: string, { rejectWithValue, dispatch } ): Promise<object> => {
  try{
    const response = await axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
      }
  })
    dispatch(updateProfileIdState(response.data.id))
    return response.data
  }catch(error:any) {
      const errorMessage: string = error.response.data.message || 'Unknown error';
      return rejectWithValue (errorMessage)
    }
  }
)



export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    updateProfileIdState: (state, action: PayloadAction<null|string>) =>{
      state.profileId = action.payload
    },
    updateSignInDataState: (state, action: PayloadAction<null|object>) =>{
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoogleAccount.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload)
      })
      builder.addCase(fetchGoogleAccount.fulfilled, (state, action: PayloadAction<object>) =>{
        state.data = action.payload
      })
    }
})

 
export const { updateProfileIdState, updateSignInDataState } = signInSlice.actions

export default signInSlice.reducer