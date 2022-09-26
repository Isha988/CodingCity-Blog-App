import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { getBlog } from '../../features/currentBlog/currentBlogSlice'
import { getBlogs } from "../../features/blogs/blogsSlice"
import { Responses } from "../../constants/constant";

import BlogBody from '../blog/BlogBody'
import BlogHeader from "../headers/BlogHeader"
import BlogGrid from "../blog/BlogGrid"
import NextPrevBlog from '../blog/NextPrevBlog'
import SubscribeForm from '../form/SubscribeForm'
import {SimpleResponseMessage} from "../smallComponents/ResponseMessage.jsx";

export default function Blog() {
  const dispatch = useDispatch()
  const {blog, prev, next, loading} = useSelector((state) => state.currentBlog);
  const {blogs, totalCount, isLoading} = useSelector((state) => state.blogs);

  const filteredBlog = blogs.filter((blg) => {
   return blg?._id != blog?._id
  })

  const {name} = useParams();
  const id = name?.split("-")[1]

  useEffect(() => {
    dispatch(getBlog(id))
  }, [name])

  useEffect(()=> {
    dispatch(getBlogs({category: blog?.category}))
  }, [blog])

  return (
    <>
      {!loading && blog && <BlogHeader blog={blog} />}
      <div className="inner">
            {loading && (<SimpleResponseMessage type={Responses.LOADING}/>)}

            {!loading && !blog && (<SimpleResponseMessage message="no result found"/>)}
        
            { !loading && blog && (
              <>
              <BlogBody title={blog?.title-blog?._id} content={blog?.content?.content && JSON.parse(blog?.content?.content)} />

              <NextPrevBlog next = {next} prev = {prev} />
              
              <SubscribeForm className="lg-subscribe bg-subscribe"/>
              
              {filteredBlog.length != 0  && (
                <div className="relatedBlog">
                  <p className="sm-heading">you may also like</p>
                  <BlogGrid blogs={filteredBlog} totalCount={totalCount - 1 } isLoading={isLoading} onClick={onclick} className="single"/>
                </div>
              )}
              </>
            )}
      </div>
    </>
  )
}
