import {FaAngleDown} from "react-icons/fa" 
import BlogCard from "./BlogCard";
import { Responses } from "../../constants/constant";
import {SimpleResponseMessage} from "../smallComponents/ResponseMessage";
import "./blog.css";

export default function BlogGrid({blogs, onClick, totalCount, isLoading, className}) {
  
  return (
    <section className="inner">
      <section className={`blogGrid ${className}`}>
        {blogs?.map(blog => (<BlogCard blog={blog}  key={blog?._id}/>))}
      </section> 
      {
        !isLoading && totalCount > blogs?.length && 
        <button className="btn loadmore" onClick={onClick}> load more <FaAngleDown/> </button>
      }

      {
        isLoading && (<SimpleResponseMessage type={Responses.LOADING}/>)
      }
      {
        !isLoading && !totalCount && (<SimpleResponseMessage message="no result found"/>)
      }
    </section>
  )
}

