import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io"

export default function ScrollUp() {
  const scrollTop = ()=> {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  }  

  const [showBtn, setShowBtn] = useState(false);

  const scrollBtn = ()=>{
    const position = window.scrollY;
    setShowBtn(position / window.innerHeight > 0.4);
  } 
  useEffect(()=> {
    window.addEventListener("scroll", scrollBtn)

    return () => window.removeEventListener("scroll", scrollBtn);
  }, []);

  return (
      <>
        {showBtn  && (
            <div className="scrollUp" onClick={scrollTop}>
                <IoIosArrowUp/>
            </div>
        ) }
      </>
   
  )
}
