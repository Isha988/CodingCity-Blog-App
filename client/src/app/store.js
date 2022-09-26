import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import blogsReducer from '../features/blogs/blogsSlice'
import currentBlogReducer from '../features/currentBlog/currentBlogSlice'
import imagesReducer from "../features/images/imagesSlice"
import formReducer from "../features/form/formSlice"
import searchReducer from "../features/blogs/searchSlice"

// creating store
export const store = configureStore({
  reducer: { 
    // combining reducers
    auth: authReducer,
    blogs: blogsReducer,
    currentBlog : currentBlogReducer,
    images : imagesReducer,
    form : formReducer,
    search: searchReducer
  },
})