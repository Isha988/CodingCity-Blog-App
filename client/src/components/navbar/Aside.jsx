import {Link, useNavigate} from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import SocialLink from '../smallComponents/SocialLink';
import { useState } from "react";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import SubscribeForm from "../form/SubscribeForm";
import Logo from "../smallComponents/Logo";

export default function Aside({user, categories, navState, toggleAside}) {
  const [dropdown, setDropdown] = useState(false);

  const hideAsideNav = () => {
    toggleAside(false);
  }

  //logout function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutButton = () => {
    dispatch(logout());
    hideAsideNav();
    navigate("/", {replace: true});
  }


  return (
    <>
        <aside className={`asideNav ${navState && "visible"}` }>
          <div className="asideHeader">
            <Logo onClick={hideAsideNav}/>
            <div className="icon last" onClick={hideAsideNav}>X</div>
          </div>

          <div className="asideBody hideScrollBar">
              <div className="sm-navLinks lg-hide">
                  <Link to="/" className="navLink first" onClick={hideAsideNav}>Home</Link>
                  <div className="dropDownWrapper">
                    <a className="navLink dropdown" onClick={() => setDropdown((prev) => !prev)}>
                      <span>Categories</span> 
                      <div className="icon"> {dropdown? <FaAngleUp/> : <FaAngleDown/>}</div>
                    </a>
                    <div className={ `dropdownList ${dropdown && "visible"}`}>
                      {
                        categories.map(category => (
                          <Link to={`/category/${category}`} className="navLink" key={category} onClick={hideAsideNav}>{category}</Link>
                        ))
                      }
                    </div>
                  </div>
                  <Link to="/contact" className="navLink" onClick={hideAsideNav}>Contact</Link>
                  <Link to="/about" className="navLink" onClick={hideAsideNav}>About</Link>
                  {
                    user && <Link to="/newBlog" className="navLink" onClick={hideAsideNav}>write a blog</Link>
                  }
              </div>

              <div className="followLinks">
                  <p className="sm-heading"> follow me</p>
                  <SocialLink name={true}/>
              </div>

              {user && <button className="btn" onClick={logoutButton}>logout</button>}

              <SubscribeForm className="bg-subscribe sm-subscribe"/>
              </div>
          </aside>
          <div className={`windowOverlay ${navState && "visible"}` } onClick={hideAsideNav}></div>
        
    </>
  )
}
