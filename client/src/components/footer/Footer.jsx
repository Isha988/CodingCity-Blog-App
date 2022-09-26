import SubscribeForm from "../form/SubscribeForm";
import SocialLink from "../smallComponents/SocialLink";
import Logo from "../smallComponents/Logo";

export default function Footer() {
  return (
    <footer className="inner footer"  >
      <SubscribeForm className="lg-subscribe"/>
        <div>
            <Logo/>
            <p className="subTitle">designed & developed with <span className="red">❤</span></p>
            <SocialLink/>
        </div>
    </footer>
  )
}

