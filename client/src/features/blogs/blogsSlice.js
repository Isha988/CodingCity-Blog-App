import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, loadMore, discard } from './blogsService'

const initialState = {
    blogs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    totalCount: 0 
  }

export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async(query,thunkAPI) => {
    try{
      return await get(query)
    }catch(error){
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const loadMoreBlogs = createAsyncThunk(
  "blogs/loadMoreBlogs",
  async(query, thunkAPI) => {
    try{
      const skip = thunkAPI.getState().blogs.blogs.length
      return await loadMore(skip, query)
    }catch(error){
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    } 
  }
)

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async(id, thunkAPI) => {
    try{
      const token =  thunkAPI.getState().auth.user.token;
      return await discard(id, token)
    }catch(error){
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    } 
  }
)

  const blogsSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
     builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs = action.payload.blogs;
        state.totalCount = action.payload.totalCount
      })
      .addCase(getBlogs.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(loadMoreBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadMoreBlogs.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs = [...state.blogs, ...action.payload.blogs];
        state.totalCount = action.payload.totalCount
      })
      .addCase(loadMoreBlogs.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs = state.blogs.filter((blog) =>{ return  blog._id !== action.payload._id}) ;
        state.totalCount = state.totalCount - 1;
      })
      .addCase(deleteBlog.rejected, (state, action)=> {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
    }
  })
  
  const { reducer } = blogsSlice
  export default reducer