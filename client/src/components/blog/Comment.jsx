import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { sendForm } from "../../features/form/formSlice";
import { Forms } from "../../constants/constant";
import Form from "../form/Form";

export default function Commment() {
  const {blog} = useSelector((state) => state.currentBlog);
    
  const dispatch = useDispatch();
  
  const initialState = {
    name: "",
    email: "",
    message: "",
  } 

  const [comment, setComment] = useState(initialState);

  const { name, email, message } = comment;

  function change(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  const submit = async()=> {
    try{
      const data = {
        form: {...comment, blog: blog.title, link: window.location.href },
        path: Forms.COMMENT,
      };
      await dispatch(sendForm(data)).unwrap();
      setComment(initialState);
    }catch(error){}
  }

  return (
    <section className="comment inner">
      <p className="sm-heading">leave a reply</p>
      <Form
        name = {Forms.COMMENT}
        inputs={[
          {
            type: "text",
            name: "name",
            value: name,
            label: "Name*",
            validation: "required|alpha_space",
          },
          {
            type: "email",
            name: "email",
            value: email,
            label: "Email*",
            validation: "required|email",
          },
        ]}
        textareas={[
          {
            name: "message",
            value: message,
            label: "comment",
            validation: "required|string",
          },
        ]}
        onChange={change}
        onSubmit={submit}
        submitText="post comment"
      />
    </section>
  );
}