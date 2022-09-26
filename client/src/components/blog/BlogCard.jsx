import {useSelector, useDispatch} from "react-redux";
import { deleteBlog } from "../../features/blogs/blogsSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import image from "../../assets/defaultImage.jpg"
import Category  from '../smallComponents/category';

function BlogCard({blog}) { 
  const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  const {user} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <article className="blogCard gridItem">

        <Category category={blog?.category}/>

        <div className="blogImg">
          <img src={ blog?.headerFile ? `${BASE_URL}/images/${blog?.headerFile}` :  image} alt={blog?.headerFile}  />
          <Link to={`/blog/${blog?.title}-${blog?._id}`} className="blogOverlay overlay">
            read more
          </Link>
        </div>

        <div className="blogText">
        <h2>
            <Link to={`/blog/${blog?.title}-${blog?._id}`} className="h2">{blog?.title}</Link>
            
        </h2>
        <p className="metaData">{blog?.createdAt && new Date(blog?.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</p>
        <p className="shortContent">{blog?.shortDescription}</p>
        </div>

        {
          user && 
          <div className="moreOptions">
            <span className="editOption option" onClick={() => navigate(`/edit/${blog?.title}-${blog?._id}`)}>edit</span>
            <span className="red option" onClick={() => dispatch(deleteBlog(blog?._id))}> delete</span>   
          </div>
        }

    </article>
  )
}

export default BlogCard
