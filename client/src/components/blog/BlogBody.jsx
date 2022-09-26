import {useState} from "react";
import Commment from '../blog/Comment'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import ProfileCard from "../smallComponents/ProfileCard";
import {FaTwitter, FaFacebook, FaLinkedin} from "react-icons/fa";
import {ShareBlock, ShareButtonIconOnly, ShareBlockStandard} from 'react-custom-share';

function BlogBody({title, content}) {
  const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  
  const shareBlockProps = {
    url: `${BASE_URL}/blog/${title}`,
    button:  ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Linkedin", icon: FaLinkedin },
      { network: "Facebook", icon: FaFacebook }
    ],
    text: `Give it a try - mywebsite.com `,
    longtext: `Take a look at this super website I have just found.`,
    buttonClassName: "shareableBtn",
    className: "shareableCover"
  };
  
  const [comment, setCommment] = useState(false);
  const showComment = () => setCommment(true);

    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }
  return (
      <section className="blogContentCover">
        <div className="blogSideShare sm-hide">
          <div className="stickyCover">
          <div className="option">share</div>
          <ShareBlock {...shareBlockProps}/>
          </div>
        </div>
        <div className="blogContent">
          <article className="blogBody" dangerouslySetInnerHTML={createMarkup(draftToHtml(content))} />
          <div className="blogBottomShare">
            <div className="option">share:</div>
            <ShareBlockStandard {...shareBlockProps} />
          </div>
          <ProfileCard className = "fullWidth"/>
          { comment ? <Commment /> : <button className="btn" onClick={showComment}>comment</button> }
        </div>
        
      </section>
  )
}

export default BlogBody
