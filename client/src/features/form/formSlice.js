import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {send} from './formService'

const initialState = {
    name: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

export const sendForm = createAsyncThunk(
  "form/sendForm", 
  async(form, thunkAPI) => {
    try{
      return await send(form);
    }
    catch(error){
      let message = error.response.data.message

      if(typeof(message) === "object") {
        const errors  = new Set(message.map(msg => msg.msg));
        message = [...errors].join(' , '); 
      }

      return thunkAPI.rejectWithValue(message);
    }
})

const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    reset : (state) =>{
      state.name = "";
      state.isError =  false;
      state.isSuccess =  false;
      state.isLoading =  false;
      state.message =  '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendForm.pending, (state, action) => {
        state.name = action.meta.arg.path;
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(sendForm.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.message = action.payload.message;

      })
      .addCase(sendForm.rejected, (state, action)=> {
        state.isError = true;
        state.isSuccess=false;
        state.message = action.payload;
        state.isLoading = false;
      })
  }
})
  
  // Extract the action creators object and the reducer
  const { actions, reducer } = formSlice;
  export const { reset } = actions;
  export default reducer;