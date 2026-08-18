import { useRef, useState, useEffect, useContext } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css";
import style from "../styles/newPost.module.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/authContext';
import {createPost} from "../services/newpostServices.js"
import Errors from "./errors.jsx"

function Newpost() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if(!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
    })

    return () => {
      editorRef.current = null;
    }
  }, [])

  const handleSubmit = async () => {
    const html = quillRef.current.root.innerHTML;
    
    try{
      await createPost(auth, setAuth, html)
      navigate('/app/posts')
    } catch(err) {
      console.log(err)
      setErrors(err)
    }
  }

  return (
    <div className={style.richText}>
      <div>
         <div ref={editorRef}></div>
      </div>
      <button className={style.btnNewNotice} onClick={handleSubmit}>ADD NOTICE</button>
      {errors.length > 0 &&
        <Errors errors={errors} />
      }
    </div>
)
}

export default Newpost