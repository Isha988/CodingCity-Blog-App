import { Link } from 'react-router-dom';
import {MdOutlineArrowForwardIos} from "react-icons/md"
import image from "../../assets/defaultImage.jpg"
import "./header.css"
import Category from '../smallComponents/category';

export default function BlogHeader({blog}) {
  const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  
  return (
    <header className="header blogHeader">
      <div className="inner">
        
        <div className="headerImg">
          <img src={ blog?.headerFile ? `${BASE_URL}/images/${blog?.headerFile}` :  image} alt={blog?.headerFile} />
          <div className="overlay"></div>
        </div>

        <div className="headerText">

          <p className="metaData">
            <Link to="/" className="metaData" >home</Link>  <MdOutlineArrowForwardIos className="seperator" />
            <Link to={`/category/${blog?.category}`} className="metaData" >{blog?.category}</Link> <MdOutlineArrowForwardIos className="seperator" />
            <span className="current metaData">{blog?.title} </span> 

          </p>
          <Category category={blog?.category}/>
          <h1 className="h1">{blog?.title}</h1>
          <p className="metaData date">{blog?.createdAt && new Date(blog?.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</p>
        </div>
      </div>
    </header>
  )
}
