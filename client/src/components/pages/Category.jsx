import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router"
import { useEffect } from "react"
import { getBlogs } from "../../features/blogs/blogsSlice"
import {categoryInfo} from "../../constants/constant"

import BlogGrid from "../blog/BlogGrid"
import Header from "../headers/Header"

export default function Category() {
  const {category} = useParams();
  const {blogs, totalCount, isLoading} = useSelector((state) => state.blogs); 

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getBlogs({category}))
  }, [category])

  return (
    <>
      <Header className="categoryHeader" heading={category} totalCount={totalCount} para={categoryInfo[category]}/>
      <BlogGrid blogs={blogs} totalCount={totalCount} isLoading={isLoading} onClick={onclick} className="grid" />
    </>
  )
}
