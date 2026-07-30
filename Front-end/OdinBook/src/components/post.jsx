import { useState } from 'react'
import style from "../styles/post.module.css"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"
import sheriffGrey from "../assets/sheriffGrey.png"
import sheriffYellow from "../assets/sheriffYellow.png"
import Comment from './comment'

function Post() {
    const status = "accepted";
    const statusLiked = "unliked";

  return(
    <div >
        <div className={style.post} >
            <div className={style.textPost}>
                <h1>TITLE POST</h1>
                <p>Description postaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <p className={style.authorPost} >Author
                    <img src={status == "accepted" ? handshake : 
                        status == "pending" ? pending : 
                        status == "sent" ? sent : toadd 
                    } className={status == "toadd" ? style.icon : ""} />
                </p>
                
                <p className={style.timetampPost} ><img src={statusLiked == "liked" ? sheriffYellow : sheriffGrey} 
                    className={style.icon + " " + style.pngAsSvg} />
                Timestamp</p>
            </div>      
        </div>
        <div className={style.commentContainer} >
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    </div>
  )
}

export default Post