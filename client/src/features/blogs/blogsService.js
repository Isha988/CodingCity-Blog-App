import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/blog`
const config = (token) => {
    return {
        headers: {
              'Authorization': 'Bearer ' + token
            }      
    }
}

export const get = async({category = "", search=""}) => {
    const {data} = await axios.get(`${BASE_URL}/getBlogs?category=${category}&search=${search}`)
    return data;
}

export const loadMore = async(skip, {category = "", search=""}) => {
    const {data} = await axios.get(`${BASE_URL}/getBlogs?skip=${skip}&category=${category}&search=${search}`)
    return data;
} 

export const discard = async(id, token) => {
    const {data} = await axios.delete(`${BASE_URL}/deleteBlog/${id}`, config(token))
    return data;
} 

