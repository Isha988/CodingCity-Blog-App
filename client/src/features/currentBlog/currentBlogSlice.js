import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {add, get, edit} from "./currentBlogService"

const initialState = {
    blog : null,
    prev: null,
    next: null,
    isError: false,
    isSuccess: false,
    loading: false,
    message: '',
}

export const getBlog = createAsyncThunk(
  "currentBlog/getBlog",
  async (id, thunkAPI) => {
    try {
      return await get(id);
    } catch (error) {
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const addBlog = createAsyncThunk(
  "currentBlog/addBlog",
  async (blog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await add(blog, token);
    } catch (error) {
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const editBlog = createAsyncThunk(
  "currentBlog/editBlog",
  async (blog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await edit(blog, token);
    } catch (error) {
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const currentBlogSlice = createSlice({
    name: 'currentBlog',
    initialState: initialState,
    reducers: {
      reset: (state) => {
        state.loading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.blog = null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getBlog.pending, (state) => {
          state.loading = true;
          state.isSuccess = false;
        })
        .addCase(getBlog.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.loading = false;
          state.blog = action.payload.blog;
          state.prev = action.payload.prev;
          state.next = action.payload.next;
        })
        .addCase(getBlog.rejected, (state, action)=> {
          state.isError = true;
          state.message = action.payload;
          state.loading = false;
          state.blog = null;
          state.prev = null;
          state.next = null;
        })
        .addCase(addBlog.pending, (state) => {
          state.loading = true
        })
        .addCase(addBlog.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.loading = false;
          state.blog = action.payload;
        })
        .addCase(addBlog.rejected, (state, action)=> {
          state.isError = true;
          state.message = action.payload;
          state.loading = false;
          state.blog = null;
        })
        .addCase(editBlog.pending, (state) => {
          state.loading = true
        })
        .addCase(editBlog.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.loading = false;
          state.blog = action.payload;
        })
        .addCase(editBlog.rejected, (state, action)=> {
          state.isError = true;
          state.message = action.payload;
          state.loading = false;
        })
    }
  })
  
  const { actions, reducer } = currentBlogSlice
  export const {reset} = actions
  export default reducer
  