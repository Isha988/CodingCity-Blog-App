import { useRef } from "react";
import image from "../../assets/header.png"

function HomeHeader() {

  const headerRef = useRef(null);

  const scrollToSubscribe = ()=> {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
    });
  } 

  const scrollToBlogs= ()=> {
    console.log(headerRef.current.clientHeight);
      window.scrollTo({
        top: headerRef.current.clientHeight + 120,
        behavior: "smooth",
    });
  }
  return (
    <header className="header homeHeader searchHeader" ref={headerRef}>
        <div className="inner">
          <div className="headerImg">
            <img src={image} />
            <div className="overlay"></div>
          </div>

          <div className="contentText">
            <h1 className="h1"> web development, <br/> made easy! </h1>
            <p className="subTitle">
                Let's get started on the next phase of your project.
            </p>
            <div className="callToAction">
                <button className="cta-btn" onClick={scrollToBlogs}>discover more</button>
                <button className="cta-btn" onClick={scrollToSubscribe}>let's connect</button>
            </div>
          </div>

        </div>
    </header>
  )
}

export default HomeHeader
