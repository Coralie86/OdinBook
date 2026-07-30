import { useState } from 'react'
import style from "../styles/usersList.module.css"
import User from "./user.jsx"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"

function UserList() {
  const handlefilterPending = () => {

  }

  const handlefilterFollowed = () => {

  }

  const handlefilterSent = () => {

  }

  return(
    <div className={style.filterUsers} >
      <div className={style.filters}>
        <div className={style.searchcontainer}>
          <input name="search" type="text" placeholder='Search a text' />
        </div >
        <button className={style.filterFollowed} onClick={handlefilterFollowed}><img src={handshake} className={style.icon}/>Followed</button>
        <button className={style.filterFollowed} onClick={handlefilterPending}><img src={pending} className={style.icon}/>To Review</button>
        <button className={style.filterFollowed} onClick={handlefilterSent}><img src={sent} className={style.icon}/>Sent</button>
      </div>
      <div className={style.listuser}>
        <User />
        <User />
        <User />
      </div>
    </div>
  )
}

export default UserList