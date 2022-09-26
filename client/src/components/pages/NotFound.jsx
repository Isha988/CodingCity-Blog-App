import Header from "../headers/Header"
import {SimpleResponseMessage} from "../smallComponents/ResponseMessage";

function NotFound() {
  return (
    <>
      <Header className="searchHeader"  heading="404"/>
      <SimpleResponseMessage message="It seems we cannot find what you are looking for. Perhaps searching can help."/>
    </>
  )
}

export default NotFound
