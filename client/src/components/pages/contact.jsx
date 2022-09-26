import { useState } from "react";
import { useDispatch} from "react-redux";
import { sendForm } from "../../features/form/formSlice";
import { Forms } from "../../constants/constant";
import Form from "../form/Form";
import Header from "../headers/Header"
import ProfileCard from "../smallComponents/ProfileCard";

export default function Contact() {
  const dispatch = useDispatch();
  
  const initialState = {
    name: "",
    email: "",
    message: "",
  } 

  const [contact, setContact] = useState(initialState);

  const { name, email, message } = contact;

  function change(e) {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }
  const submit = async()=> {
    try{
      const data = {
        form: contact,
        path: Forms.CONTACT,
      };
      await dispatch(sendForm(data)).unwrap();
      setContact(initialState);
    }catch(error){}
  }

  return (
    <>
      <Header className="searchHeader"  heading="contact us"/>
      <main className="inner contactPage">
        <div className = "formCover">
          <p className="heading2 h1">Get In Touch</p>
          <Form
            name = {Forms.CONTACT}
            inputs={[
              {
                type: "text",
                name: "name",
                value: name,
                label: "Your Name (required)",
                validation: "required|alpha_space",
                className : "sm-input"
              },
              {
                type: "email",
                name: "email",
                value: email,
                label: "Your email (required)",
                validation: "required|email",
                className: "sm-input"
              },
            ]}
            textareas={[
              {
                name: "message",
                value: message,
                label: "Your message (required)",
                validation: "required|string",
              },
            ]}
            onChange={change}
            onSubmit={submit}
            submitText="send"
          />
        </div>

        <ProfileCard className="withBackground" />
      </main>
    </>
  );
}
