import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {categories} from "../../constants/constant"
import Search from './search';
import Aside from './Aside';
import SocialLink from '../smallComponents/SocialLink';
import "./Nav.css"
import {FaBars, FaSearch, FaRegMoon} from "react-icons/fa";
import {MdOutlineWbSunny} from "react-icons/md"
import Logo from '../smallComponents/Logo';


function Nav() {
  //getting user
  const {user} = useSelector((state)=> state.auth)

  //getting location
  const location = useLocation();
  const path = location.pathname;

  //toggleing search
  const [search, setSearch]= useState(false);

  function toggleSearch(boolean){
    setSearch(boolean); 
  }

  const [navState, setNavState] = useState(false)

  function toggleAside(boolean){
    setNavState(boolean); 
  }

  useEffect(()=> {
    if(navState) {
      document.body.classList.add("disable");
      document.getElementById("main").classList.add("slide");
      document.getElementById("navBar").classList.add("slide");
    }else{
      document.body.classList.remove("disable");
      document.getElementById("main").classList.remove("slide");
      document.getElementById("navBar").classList.remove("slide");
    }
  }, [navState])

  useEffect(()=> {
    toggleSearch(false);
  }, [path])


  //sticky navbar 
  const [sticky, setSticky] = useState(false);
  const [scroll, setScroll] = useState(0);

  const isSticky = () => {
    const position = window.scrollY;
    setScroll(prev => {
      setSticky(position < prev && position / window.innerHeight > 0.1 );
      return(position);
    })
  }
  useEffect(() => {
    window.addEventListener("scroll", isSticky);

    return () => window.removeEventListener("scroll", isSticky);
  }, []);

  //changing theme
  const initialTheme = JSON.parse(localStorage.getItem("darkTheme") )|| false;
  const [darkTheme, setDarkTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
    const root = document.querySelector(":root");
    if(!darkTheme){
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--foreground", "#000");
      root.style.setProperty("--lightBackground", "#f2f4f6");
    }else{
      root.style.setProperty("--background", "#1c1c1c");
      root.style.setProperty("--foreground", "#fff");
      root.style.setProperty("--lightBackground", "#333");
    }
  },[darkTheme]);

  return (
    <div className={`${sticky && "stickyNav"}`}>
      <nav className="navBar" id="navBar">
          <div className={`${sticky && "lg-hide"} sm-hide `}>
            <div className="nav">
              <div className="navColumn">
                <div className="">
                  <SocialLink/>
                </div> 
              </div>

              <div className="navColumn">
                <Logo/>
              </div>

              <div className="navColumn">
                <button className="btn" 
                  onClick={() => window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  })} 
                >
                  follow</button>
              </div>
            </div>
          </div>

          <div className="nav"> 

            <div className="navColumn">
              <div className="icon" onClick={() => toggleAside(true)}><FaBars/></div>
            </div>

            <div className={`${!sticky && "lg-hide"} navColumn `}>
              <Logo/>
            </div>

            <div className="navColumn sm-hide navLinks">
              <Link to="/" className={`navLink ${path == "/" && "active"}`}>Home</Link>

              <div className="dropDownWrapper">
                <a className={`navLink dropDown ${path == "/category" && "active"}`}>Categories</a>
                <div className="dropDownListWrapper">
                  <div className="dropDownList">
                    {
                      categories.map(category => (
                        <Link to={`/category/${category}`} className="navLink" key={category}>{category}</Link>
                      ))

                    }
                  </div>
                </div>
              </div>

              <Link to="/contact" className={`navLink ${path == "/contact" && "active"}`}>Contact</Link>
              <Link to="/about" className={`navLink ${path == "/about" && "active"}`}>About</Link>
              {user && 
                <Link to="/newBlog" className={`navLink  ${path == "/newBlog" && "active"}`}>Write a blog</Link>
              }
            </div>

            <div className="NavColumn">
              <div onClick={()=> toggleSearch(true)} className="icon"><FaSearch/></div> 
              <div className="icon last" onClick={() => setDarkTheme(!darkTheme)}>{
                darkTheme ? <MdOutlineWbSunny/> :<FaRegMoon/>
              }</div>
            </div>
          </div>
      </nav>

      <Search toggleSearch={toggleSearch} className={search && "visible"}/>

      <Aside user={user} categories={categories} navState={navState} toggleAside={toggleAside}/>
    </div>
  )
}


export default Nav
