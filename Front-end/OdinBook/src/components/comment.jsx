import { useContext, useState } from 'react'
import style from "../styles/comment.module.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { AuthContext } from '../services/authContext'
import { TiTickOutline } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { editComment } from '../services/commentServices';

function Comment({comment, deleteComment}) {
  const [commentInfo, setCommentInfo] = useState(comment)
  const {auth} = useContext(AuthContext);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditInput = async () => {
    setIsEditable(true)
  }

  const handleEditComment = async () => {
    const newContent = document.getElementById("commentDescription").value;

    try {
      const newComment = await editComment(auth, comment.id, newContent);
      setCommentInfo({
        ...commentInfo,
        description: newComment.description,
        timestamp: newComment.timestamp,
        isEdited: newComment.isEdited,
      })
      setIsEditable(false)
    } catch(err) {
      console.log(err)
    }
    
  }

   const handleCancel = async () => {
    setIsEditable(false)
  }


  const handleDeleteComment = async () => {
    
    try {
      await deleteComment(comment.id)
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div className={style.commentContainer} >
      <div className={style.iconContainer}>
        <p className={style.editedParagraph}>{commentInfo.isEdited ? "Edited" : ""}</p>
        <FaPen className={style.iconComment} onClick={handleEditInput} />
        <FaRegTrashAlt className={style.iconComment} onClick={handleDeleteComment} />
      </div>
      {isEditable ? (
        <div className={style.iconComEdited}>
          <input id="commentDescription" defaultValue={commentInfo.description} />
          <TiTickOutline onClick={handleEditComment} className={style.iconCommentEdited} />
          <TiCancel onClick={handleCancel} className={style.iconCommentEdited} />
        </div>
      ) : (
        <p className={style.commentContent} >{commentInfo.description}</p>
      )}      
      <h1 className={style.username} >{comment.writer.username}
        <p className={style.dateContent} >{(new Date(commentInfo.timestamp)).toLocaleString()}</p>
      </h1>        
    </div>
  )
}

export default Comment