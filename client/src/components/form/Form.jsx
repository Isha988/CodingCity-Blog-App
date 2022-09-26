import { useState, useRef} from "react";
import SimpleReactValidator from "simple-react-validator";
import { useSelector } from "react-redux";
import {PopupResponseMessage} from "../smallComponents/ResponseMessage";
import { Responses } from "../../constants/constant";

export default function Form({ name, className, submitText, onSubmit, onChange, inputs, textareas}) {

  const formState = useSelector((state) => state.form);

  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  function submit(e) {
    e.preventDefault();
    if (validator.current.allValid()) {
      onSubmit();
      validator.current.hideMessages();
      forceUpdate(1);
    } else {
      validator.current.showMessages();
      forceUpdate(2);
    }  
  }

  return(
     <>
       <form className={`form ${className}`} onSubmit={submit}>

        {inputs && inputs.map(input => (
          <div className={` inputCover ${input.className}`} key={input.name}>
            {validator.current.message(input.name, input.value, input.validation)}
            <label htmlFor={input.name}>{input.label}</label>           
            <input type={input.type}
              name={input.name}
              id={input.name}
              value={input.value}
              placeholder = {input.placeholder}
              onChange={onChange}/>
          </div>
        )) }

        {textareas && textareas.map(textarea => (
          <div className={` inputCover ${textarea.className}`} key={textarea.name}>
            {validator.current.message(textarea.name, textarea.value, textarea.validation)}
            <label htmlFor={textarea.name}>{textarea.label}</label>
            <textarea
              name={textarea.name}
              id={textarea.name}
              value={textarea.value}
              onChange={onChange}
              cols="5"
              rows="6"
              />
          </div>
        )) }

        <input type="submit" value={submitText} className="btn sm-btn" disabled={formState.name == name && formState.isLoading} /> 
      </form>

      {
        formState.name == name && <>
          { formState.isLoading && <PopupResponseMessage type={Responses.LOADING} message="please wait, your query is in process"/>}
          
          {formState.isSuccess && <PopupResponseMessage type={Responses.SUCCESSS} message={formState.message}/>}
          
          { formState.isError && <PopupResponseMessage type={Responses.ERROR} message={formState.message}/>}
        </>
      }
     </>
  )
}
