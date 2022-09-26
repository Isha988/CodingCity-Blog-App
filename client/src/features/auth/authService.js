import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/admin`

//Login
export const authLogin = async(user) => {
    const {data} = await axios.post(`${BASE_URL}/login`, {...user})

    if(data) localStorage.setItem("user", JSON.stringify(data));

    return data;
}

//Logout
export const authLogout = ()=> {
    localStorage.removeItem("user");
}

