import { useState } from 'react'
import style from "../styles/user.module.css"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"

function User() {
    const status = "toadd";

    return(
        <div className={style.userContainer}>
            <div className={style.userContent}>
                <img src="null" className={style.userImage} />
                <h1>username</h1>
                <p className={style.userStatus}>{status == "pending" ? "Request to review" 
                    : status == "accepted" ? "Request accepted"
                    : status == "toadd" ? "Follow user"
                    : "Request sent"
                    }
                <img src={status == "accepted" ? handshake : 
                    status == "pending" ? pending : 
                    status == "sent" ? sent : toadd 
                } className={style.icon + ((status == "toadd") || (status == "pending") ? style.status : "")} />
                </p>
                
            </div>
        </div>
    )
}

export default User