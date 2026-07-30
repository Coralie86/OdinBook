import { useRef, useState, useEffect } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";
import style from "../styles/newPost.module.css"

function Newpost() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if(!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
    })

    return () => {
      editorRef.current = null;
    }
  }, [])

  const handleSubmit = () => {

  }

  return (
    <div className={style.richText}>
      <div>
         <div ref={editorRef}></div>
      </div>
      <button className={style.btnNewNotice} onClick={handleSubmit}>ADD NOTICE</button>
    </div>
)
}

export default Newpost