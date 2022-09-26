import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../features/auth/authSlice"
import Header from '../headers/Header';
import {PopupResponseMessage} from "../smallComponents/ResponseMessage";
import { Responses } from "../../constants/constant";

function Login() {
  const dispatch = useDispatch();
  const {isError, message, isLoading} = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    userName : "",
    password: ""
  })

  const initialError = {
    error: false,
    errorMessage:{}
  }
  const [validationError, setValidationError] = useState(initialError)

  const onChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUser({
      ...user, [inputName] : inputValue
    })
  } 
  
  
  const handelSubmit = async(e) => {
    e.preventDefault();
    let error = false; 
    for(const key in user) {
      if((user[key]).trim() === "") {
        error = true
        setValidationError((prev) => (
          {error: true,
            errorMessage: {
              ...prev.errorMessage , [key] : `${key} is required`
            }}
        ))}
    }
    if(error) return
    dispatch(login(user));
    setValidationError({initialError});
  }

  return (
    <>
    <Header className="searchHeader"  heading="login"/>
    <div className="inner">
      <form className = "form normalForm" onSubmit={handelSubmit}>

        <div className="inputCover">
        {validationError.error && <div className="validationError">{validationError.errorMessage.userName}</div>}
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName"  value={user.userName} onChange = {onChange} autoFocus={true}/>
        </div>

        <div className="inputCover">
          {validationError.error && <div className="validationError">{validationError.errorMessage.password}</div>}
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} onChange = {onChange}/>
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
      {isError && (
        <div>{message}</div>
      )}
      {isLoading && <PopupResponseMessage type={Responses.LOADING} message="please wait, your query is in process"/>}
    </div>
    </>
  )
}

export default Login
