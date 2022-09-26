import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DraftEditor({blog, setBlog, openWindow}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(()=> {
    if(blog?._id) setEditorState(EditorState.createWithContent(convertFromRaw(blog?.content)))
    else setEditorState(EditorState.createEmpty())
  },[blog?._id])

  
  const onEditorStateChange = (editorState) =>{
    setEditorState(editorState)
    const contentState = editorState.getCurrentContent();
    const content = convertToRaw(contentState);
    setBlog({
      ...blog, content: content
    })
  }
  const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    blockType: {
      options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    }
  }

  return (
     <div className="editorCover">
       <div className="openGallery"><div className="option red" onClick={openWindow}>open Gallery</div></div>
       <Editor
        editorClassName = "editor"
        toolbarClassName="editorToolbar"
        wrapperClassName="editorWrapper"
        placeholder = "start writing your blog...."
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar = {toolbar}
        /> 
     </div>
  )
}

export default DraftEditor
