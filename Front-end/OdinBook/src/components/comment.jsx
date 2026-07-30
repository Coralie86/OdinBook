import { useState } from 'react'
import style from "../styles/comment.module.css"

function Comment() {
  return(
    <div className={style.commentContainer} >
        <p className={style.commentContent} >this is a commment of the postaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
        <h1 className={style.username} >Username<p className={style.dateContent} >Timestamp</p></h1>
        
    </div>
  )
}

export default Comment