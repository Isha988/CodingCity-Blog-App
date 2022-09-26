import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from './blogsService'

const initialState = {
    suggestions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    totalCount: 0 
}

export const getSuggestions = createAsyncThunk(
  "search/getSuggestions",
  async(query,thunkAPI) => {
    try{
      return await get(query)
    }catch(error){
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
  }
)
  const searchSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
      reset : (state) => {
        state.suggestions= [];
        state.isError= false;
        state.isSuccess= false;
        state.isLoading= false;
        state.message= '';
        state.totalCount = 0; 
      }
    },
    extraReducers: (builder) => {
     builder
      .addCase(getSuggestions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.suggestions = action.payload.blogs;
        state.totalCount = action.payload.totalCount
      })
      .addCase(getSuggestions.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
    }
  })
  
  const { reducer, actions } = searchSlice
  export const { reset } = actions
  export default reducer