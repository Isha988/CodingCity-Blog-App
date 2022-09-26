import { Responses } from "../../constants/constant";
import {reset} from "../../features/form/formSlice";
import { useDispatch } from "react-redux";
import Loader from "../../assets/loader.gif"
import Spinner from "../../assets/spinner.gif"
import Success from "../../assets/success.png"
import Failure from "../../assets/failure.png"

import "./smallComponent.css"

function SimpleResponseMessage({message, type}) {
  let image = "";
  switch (type) {
    case Responses.LOADING:
      image = Loader;
      break;

    case Responses.SPINING:
      image = Spinner;
      break;
  
    default:
      break;
  }

  return (
    <div className="responseMessage">
        <div className="resMessageImage">
          {type && (<img src={image} alt={type} />)}
        </div>
        {message}
    </div>
  )
}

export default function PopupResponseMessage({message, type}) {
  const dispatch = useDispatch();

  const onclick = () => dispatch(reset());

  let image = "";
  let btnText = "";

  switch (type) {
    case Responses.LOADING:
      image = Spinner;
      break;

    case Responses.SUCCESSS:
      image = Success;
      btnText = "ok, thanks"
      break;
    
    case Responses.ERROR:
      image = Failure;
      btnText = "try again!"
      break;
  
    default:
      break;
  }
  return (
    <div className="popup">
      <div className={`responseMessage ${type}`}>
        <div className="resMessageImage">
          {type && (<img src={image} alt={type}/>)}
        </div>
       <div className="resMessage">
          <p className="type">{type}</p>
          <p className="message">{message}</p>
          {btnText && <button className ="btn" onClick = {onclick}> {btnText}</button>}
       </div>
      </div>
    </div>
  )
}


export {SimpleResponseMessage, PopupResponseMessage}
