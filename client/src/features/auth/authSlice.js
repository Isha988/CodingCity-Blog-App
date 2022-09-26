import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authLogin, authLogout  } from "./authService";
import jwt_decode from "jwt-decode";

// Get user from localStorage
let user = JSON.parse(localStorage.getItem('user'));
if(user) {
  const decode = jwt_decode(user.token);
  if(decode.exp < new Date().getTime()/1000) {user = null;};
}


//initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const login = createAsyncThunk(
  "auth/login", 
  async(user, thunkAPI) => {
    try{
      return await authLogin(user);
    }
    catch(error){
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk(
  "auth/logout",
  () => authLogout()
)


//Creating Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
     reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
     }
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.isLoading = false;
          state.user = action.payload;

        })
        .addCase(login.rejected, (state, action)=> {
          state.isError = true;
          state.message = action.payload;
          state.isLoading = false;
          state.user = null;

        })
        .addCase(logout.fulfilled, (state)=> {
          state.user = null;
        })
    }
  })
  
  // Extract the action creators object and the reducer
  const { actions, reducer } = authSlice
  // Extract and export each action creator by name
  export const { reset } = actions
  // Export the reducer, either as a default or named export
  export default reducer