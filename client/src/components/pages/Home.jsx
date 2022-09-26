import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getBlogs, loadMoreBlogs} from "../../features/blogs/blogsSlice"
import { useSearchParams } from 'react-router-dom';

import HomeHeader from "../headers/HomeHeader";
import Header from "../headers/Header";
import BlogGrid from "../blog/BlogGrid"

function Home() {
  const {blogs, totalCount, isLoading} = useSelector((state) => state.blogs)

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const dispatch = useDispatch();
  useEffect(() => {
    if(search) dispatch(getBlogs({search}))
    else dispatch(getBlogs({}));
  }, [search])
 
  return (
    <>
        {
          search ? <Header className="searchHeader" heading={search} totalCount={totalCount} /> : <HomeHeader blog={blogs[0]} />
        }
        <BlogGrid blogs={blogs} 
          onClick = {() =>dispatch(loadMoreBlogs({}))} 
          totalCount = {totalCount}
          isLoading = {isLoading}
          className = "grid"
        />
    </>
  )
}


export default Home

