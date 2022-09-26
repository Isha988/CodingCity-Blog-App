import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/blog`
const config = (token) => {
    return {
        headers: {
              'Authorization': 'Bearer ' + token
            }      
    }
}

export const get = async(id) => {
    const {data} = await axios.get(`${BASE_URL}/getBlog/${id}`)
    return data;
}

export const add = async(blog, token) => {
    const {data} = await axios.post(`${BASE_URL}/addBlog`, {...blog}, config(token))
    return data;
}

export const edit = async(blog, token) => {
    const {data} = await axios.put(`${BASE_URL}/editBlog/${blog._id}`, {...blog}, config(token))
    return data;
}