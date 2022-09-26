import { Link } from "react-router-dom";
import "./smallComponent.css"

function Category({category}) {
  let asciiCode = category?.slice(0,1).charCodeAt(0);
  const colorNum = asciiCode?.toString() + asciiCode?.toString() + asciiCode?.toString();
 
  var num = Math.round(0xffffff * parseInt(colorNum));
  var r = num >> 16 & 255;
  var g = num >> 8 & 255;
  var b = num & 255;
  return (
    <div className="category">
        <span className="categoryChar" style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}>
          {category?.slice(0,1)}</span>
        <Link to={`/category/${category}`} className="categoryName">- {category}</Link>
    </div>

  )
}

export default Category

