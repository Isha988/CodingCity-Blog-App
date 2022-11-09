import { useState , useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addBlog, getBlog, editBlog} from "../../features/currentBlog/currentBlogSlice";
import { EditorState, convertToRaw } from "draft-js";
import { Responses } from "../../constants/constant";

import Form from "../Cpanel/Form";
import ImageWindow from "../Cpanel/ImageWindow";
import DraftEditor from "../Cpanel/DraftEditor";
import Header from "../headers/Header";
import {SimpleResponseMessage} from "../smallComponents/ResponseMessage.jsx";
import "../Cpanel/Cpanel.css";


function AddBlog() {
  const {blog, loading} = useSelector((state) => state.currentBlog);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [windowState, setWindowState] = useState(false);
  const openWindow = () =>setWindowState(true);
  const closeWindow = () => setWindowState(false)

  const {name} = useParams();
  const id = name?.split("-")[1]
  const isEdit =  location.pathname.split("/")[1] == "edit"
  
  let initialState = {
    title : "",
    headerFile : "",
    shortDescription: "",
    category: "Backend",
    content : convertToRaw(EditorState.createEmpty().getCurrentContent())
  }

  const [newBlog, setNewBlog] = useState(initialState);

  useEffect(()=> {
    const fetchBlog = async() => {
      const response = await dispatch(getBlog(id)).unwrap();
      setNewBlog({...response?.blog, content: JSON.parse(response?.blog?.content?.content)})
    }
    if (isEdit) fetchBlog();
    else setNewBlog(initialState) 
  }, [location.pathname])
  
  const handelSubmit = async () => {
    try {
      let response;

      if(isEdit) response = await dispatch(editBlog(newBlog)).unwrap()
      else response = await dispatch(addBlog(newBlog)).unwrap()
      
      navigate(`/blog/${response.title}-${response._id}`);
    } catch (error) {
      // do something
    }
  }

  return (
    <>
      <Header heading={isEdit? "Edit blog": "Create new blog"}/>
      <section className="inner">
        {loading && (<SimpleResponseMessage type={Responses.LOADING}/>)}
        {isEdit && !loading && !blog && (<SimpleResponseMessage message="no result found"/>)}

        {((isEdit && !loading && blog) || !isEdit) &&  (
          <>
            <Form setBlog={setNewBlog} blog={newBlog} openWindow={openWindow}/>
            <DraftEditor setBlog={setNewBlog} blog={newBlog} openWindow={openWindow}/>      
            <button className="btn sm-btn" onClick={handelSubmit}>save</button>
          </>
        )}

      </section>
      <ImageWindow setBlog={setNewBlog} blog={newBlog} windowState={windowState} closeWindow = {closeWindow}/>
    </>
  )
}

export default AddBlog
