import {categories} from "../../constants/constant"
import {FaEdit} from "react-icons/fa"

function Form({blog, setBlog, openWindow}){
    const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/images`

    const onChange = (e) => {
        const target = e.target;
        setBlog({   ...blog,[target.name]: target.value})
    }
    return (
        <section className="blogForm">
        {
        blog.headerFile && 
        (<div className="selectedImage">
             <img src={`${BASE_URL}/${blog.headerFile}`} alt={blog.headerFile} />
             <div className="overlay"></div>
         </div>)
        }

           <div className="chooseFile icon" onClick={openWindow}><FaEdit/></div>
           <div className="inputs">
                <input type="text" name="title"
                    value={blog.title} className="titleInput"
                    placeholder = "your blog title"
                    onChange={onChange}
                />

                <textarea name="shortDescription" cols="5" rows="6"
                    value={blog.shortDescription} className="descInput"
                    placeholder = "your blog short description"
                    onChange={onChange}
                />

                <label htmlFor="category" className="option">Category</label>
                <select name="category" 
                    value={blog.category} className="categorySelect option"
                    onChange={onChange}>
                    {categories.map(category => {
                        return (<option value={category} key={category}> {category}</option>)
                    })} 
                </select>
           </div>
        </section>
    )
}

export default Form
