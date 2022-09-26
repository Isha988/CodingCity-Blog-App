import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/images`

//get all images
export const getAllImages = async()=> {
    const {data} = await axios.get(`${BASE_URL}/getAll`);

    return data;
}

//upload a image 

export const addImage = async(image, token)=> {
    let fd = new FormData();
    fd.append('file',image)
    const {data} = await axios.post(`${BASE_URL}/upload`, fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
        }
    });
    return data;
}
