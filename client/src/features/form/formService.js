import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

//sending form

export const send = async({form, path})=> {
    const {data} = await axios.post(`${BASE_URL}/${path}`, {...form});

    return data;
}