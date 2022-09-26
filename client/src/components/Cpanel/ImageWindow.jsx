import {useSelector, useDispatch} from "react-redux"
import {useEffect, useRef} from "react"
import {fetchAllImages, uploadImage} from "../../features/images/imagesSlice";

function ImageWindow({windowState, closeWindow, blog, setBlog}) {
    const imagesState = useSelector((state) => state.images);
    const dispatch = useDispatch();
    const BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/images`
    
    useEffect(()=> {
        dispatch(fetchAllImages());
    },[])

    useEffect(()=> {
        if(windowState) {
          document.body.classList.add("disable");
        }else{
          document.body.classList.remove("disable");
        }
      }, [windowState])

    const fileInput = useRef(null);

    const onChange = ()=> {
        if(fileInput.current.value){
            const file = fileInput.current.files[0];
            dispatch(uploadImage(file))
            fileInput.current.value = null;
        }
    }

    const setHeaderFile = (image) => {
        setBlog({...blog, headerFile : image});
        closeWindow();
    }
    const copyLink = (image) => {
        navigator.clipboard.writeText(`${BASE_URL}/${image}`)
    }
  return (
    <section className={`imageWindow ${windowState && "visible"}`}>
        <div className="overlay"/>

        <header className="imageWindowHeader">
                <h2 className="heading2">Available Images</h2>
                <div>
                    <div className="imageUpload option">
                        <label className="red" htmlFor="imageFile">Upload new image</label>
                        <input type="file" name="imageFile" id="imageFile" hidden
                            accept ="image/*" multiple = {false}  ref={fileInput} onChange={onChange}/>
                    </div>
                    <div className="closeWindow icon" onClick={closeWindow}>X</div>
                </div>
        </header>

            <div className="imageGrid grid inner hideScrollBar">
            {
                imagesState.images.map((image) => {
                    return (
                        <div className="imageCard gridItem" key={image}>
                            <div className="image">
                                <img src={`${BASE_URL}/${image}`} alt={image} />
                            </div>
                            <div>
                                <div className="option" onClick={() => setHeaderFile(image)}>set as header file</div>
                                <div className="option" onClick={() => copyLink(image)}>copy link</div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
    </section>
  )
}

export default ImageWindow

