import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllImages, addImage } from './imagesService'

const initialState = {
    images: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  export const fetchAllImages = createAsyncThunk(
    "auth/fetchAllImages",
    async(_, thunkAPI) => {
      try {
        return await getAllImages();
      } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
      }
    }
  )

  export const uploadImage = createAsyncThunk(
    "auth/uploadImage",
    async(image, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await addImage(image, token);
      } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message);
      }
    }
  )

  const imagesSlice = createSlice({
    name: 'images',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllImages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(fetchAllImages.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.images = [action.payload, ...state.images]

      })
      .addCase(uploadImage.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
    }
  })
  
  // Extract the action creators object and the reducer
  const { reducer } = imagesSlice
  export default reducer