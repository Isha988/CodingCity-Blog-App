import { useState, useCallback, useEffect, useRef } from "react";
import {debounce} from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getSuggestions, reset} from "../../features/blogs/searchSlice"
import { FaSearch} from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import {SimpleResponseMessage} from "../smallComponents/ResponseMessage.jsx";
import { Responses } from "../../constants/constant";
import image from "../../assets/defaultImage.jpg"


export default function Search(props) {
  const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/images`

  const {suggestions, isLoading, isSuccess} = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initalState = searchParams.get("search") || "";

  const [search, setSearch] = useState(initalState);

  const close = ()=>{
    props.toggleSearch(false);
    dispatch(reset());
  }

  useEffect(()=> {
    setSearch(initalState);
    close();
  },[initalState])

  const sendRequest = (newValue)=>{
    const search = newValue.trim();
    const regex = /\\/g;

    if(!search) return dispatch(reset());
    else if(search.match(regex)) return;
    dispatch(getSuggestions({search}))
  } 

  const debounceCall = useCallback(debounce((newValue) => sendRequest(newValue), 300), [])

  const onchange = (e) => {
    setSearch(e.target.value)
    debounceCall(e.target.value);
  }

  const onsubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    props.toggleSearch(false)
    navigate(`/?search=${search}`)
    dispatch(reset());
  }

  const listRef = useRef();

  const moveFocus = (e) => {
      const active = document.activeElement;
      const list = listRef.current;
      const key = e.keyCode;
      if(key === 40 && active.nextSibling) {
        active.nextSibling.focus();
      }
      else if(key === 40 && !active.nextSibling){
        list.firstChild.focus();
      }
      else if(key === 38 && active.previousSibling) {
        active.previousSibling.focus();
      }
      else if(key === 38 && !active.previousSibling){
        list.lastChild.focus();
      }
      else if(key === 13){
        active.firstChild.click();
      } 
  }

  const inputKeyPress = (e)=> {
    if(e.keyCode === 40){
      const node = listRef.current;
      node.firstChild.focus();
    }
  }

  return (
    <section className={`searchCover ${props.className}`} id="search">
        <div className="inner">
          <div className="searchFormCover">
            <form className="searchForm" onSubmit={onsubmit}>
              <button type="submit" className="icon first search">
                <FaSearch/>
              </button>
              <input 
                type="search" 
                placeholder="Enter your search topic" 
                value={search} onChange={onchange} 
                onKeyUp = {inputKeyPress}
                name="search"
                required = {true} 
              />
            </form>
            <div className="icon last" onClick={close}>X</div>
          </div>

          <div className="suggestionWrapper" ref={listRef} onKeyUp={moveFocus}>

            {
              isLoading && (<SimpleResponseMessage type={Responses.LOADING}/>)
            }
            {
              isSuccess && !suggestions.length && search && (<SimpleResponseMessage message="no result found"/>)
            }
            {
              suggestions.map((sugg, index) => (
                <div key={sugg?._id} tabIndex={index} className="suggItem">
                  <Link to={`/blog/${sugg?.title}-${sugg?._id}`}  className="suggestion" onClick={close}>
                    <div className="suggImage">
                      <img src={ sugg?.headerFile ? `${BASE_URL}/${sugg?.headerFile}` :  image} alt={sugg?.headerFile}/>
                    </div>
                    <div className="suggText">
                      <p className="suggName">{sugg?.title}</p>
                      <p className="suggDate red">{sugg?.createdAt && new Date(sugg?.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</p>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
    </section>
  )
}
