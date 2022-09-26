import { Link } from 'react-router-dom';
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";

export default function NextPrevBlog({next, prev}) {
  return (
    <section className="nextPrev">
        {prev && (
            <Link to={`/blog/${prev?.title}-${prev?._id}`} className="prev nextPrevLink">
                <div className="nextPrevName">
                    <span className="nextPrevIcon"><IoIosArrowBack/></span>
                    <p className="option"> - previous Blog</p>
                </div>
                <p className="h2">{prev?.title}</p>
            </Link>
        )}
        
        {next && (
            <Link to={`/blog/${next?.title}-${next?._id}`} className="next nextPrevLink">
                <div className="nextPrevName">
                    <p className="option">next Blog - </p>
                    <span className="nextPrevIcon"><IoIosArrowForward/></span>
                </div>
                <p className="h2">{next?.title}</p>
            </Link>
        )}

    </section>
  )
}
