import { useState } from "react";
import { useDispatch} from "react-redux";
import { sendForm } from "../../features/form/formSlice";
import Form from './Form';
import { Forms } from '../../constants/constant';
import "./Form.css"

function SubscribeForm({className}) {
  const dispatch = useDispatch();
  
  const initialState = {
    name: "",
    email: ""
  } 

  const [form, setForm] = useState(initialState);

  const { name, email} = form;

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const submit = async()=> {
    try{
      const data = {
        form,
        path: Forms.SUBSCRIBE,
      };
      await dispatch(sendForm(data)).unwrap();
      setForm(initialState);
    }catch(error){}
  }

  return (
    <div className={`subscribe ${className != undefined && className}`}>
        { className.split(" ").includes("lg-subscribe") ? <>
                <h2>subscribe to our newsletter</h2>
                <p>Get notified of the latest blog on Web Development</p>
            </> : <div className="sm-heading">sign up to updates</div>
        }

        <Form 
        name={Forms.SUBSCRIBE}
        className = "subscribeForm" 
        inputs={[
            {
            type: "text",
            name: "name",
            value: name,
            placeholder: "Enter your name",
            validation: "required|alpha_space",
            },
            {
            type: "email",
            name: "email",
            value: email,
            placeholder: "Enter your email",
            validation: "required|email",
            },
        ]}
        onChange={change}
        onSubmit={submit}
        submitText="subscribe"
        />
    </div>
  )
}

export default SubscribeForm
