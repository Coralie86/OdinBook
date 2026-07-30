import { useState } from 'react'
import style from "../styles/listpost.module.css"
import Post from "./post.jsx"
import sheriffYellow from "../assets/sheriffYellow.png"
import handshake from "../assets/handshake.svg"

function Listpost() {

  const handlefilterLiked = () => {

  }

  const handlefilterFollowed = () => {

  }


  return(
    <>
      <div className={style.filters}>
        <div className={style.searchcontainer}>
          <input name="search" type="text" placeholder='Search a text' />
        </div >
        <button className={style.filterLiked} onClick={handlefilterLiked}><img src={sheriffYellow} className={style.pngAsSvg} />Liked</button>
        <button className={style.filterFollowed} onClick={handlefilterFollowed}><img src={handshake} className={style.icon}/>Followed</button>
      </div>
      <div className={style.listpost}>
        <Post />
        <Post />
      </div>
    </>
  )
}

export default Listpost