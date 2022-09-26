import SocialLink from "./SocialLink";
import profilePic from "../../assets/profile_pic.jpg"
import "./smallComponent.css";

export default function ProfileCard({className}) {
  return (
    <div className={`profileCard ${className}`}>
      <div className="profileImage">
          <img src={profilePic} alt="profileImage" />
      </div>
      <div className="profileText">
          <h3 className="name">Isha Kapoor</h3>
          <p className="intro">
            Etiam vitae dapibus rhoncus. Eget etiam aenean nisi montes felis pretium donec veni.
            Pede vidi condimentum et aenean hendrerit. 
            Quis sem justo nisi varius tincidunt nec aliquam arcu tempus vel laoreet lorem.
          </p>
          <div className="socialLink"><SocialLink/></div>
      </div>
    </div>
  )
}
