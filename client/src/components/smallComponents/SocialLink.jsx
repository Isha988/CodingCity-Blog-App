import { FaFacebook, FaGithub, FaTwitter, FaLinkedin} from "react-icons/fa";
import { ProfileLinks } from "../../constants/constant";

export default function SocialLink({name = false}) {
  return (
    <>
        <a href={ProfileLinks.LINKEDIN} className={`linkedIn ${name && "followLink"}`} target = "_blank">
            <span className="socialIcon"><FaLinkedin/></span>
            {name && <span>linkedIn</span>}
        </a> 
        <a href={ProfileLinks.GITHUB} className={`github ${name && "followLink"}`} target = "_blank">
            <span className="socialIcon"><FaGithub/></span>
            {name && <span>github</span>}
        </a> 
        <a href={ProfileLinks.TWITTER} className={`twitter ${name && "followLink"}`} target = "_blank">
            <span className="socialIcon"><FaTwitter/></span>  
            {name && <span>twitter</span>}
        </a> 
        <a href={ProfileLinks.LINKEDIN} className={`facebook ${name && "followLink"}`} target = "_blank">
            <span className="socialIcon"><FaFacebook/></span>
            {name && <span>facebook</span>}
        </a> 
    </>
  )
}
