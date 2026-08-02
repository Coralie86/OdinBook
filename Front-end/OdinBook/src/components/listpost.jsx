import { useContext, useEffect, useState } from 'react'
import style from "../styles/listpost.module.css"
import Post from "./post.jsx"
import sheriffYellow from "../assets/sheriffYellow.png"
import handshake from "../assets/handshake.svg"
import { AuthContext } from '../services/authContext.jsx'
import { fetchListPost } from '../services/postServices.js'
import { IoMdSearch } from "react-icons/io";

function Listpost() {
  const {auth} = useContext(AuthContext);
  const [listPost, setListPost] = useState([]);
  const [filter, setFilter] = useState({
    search: null,
    btn:null
  })

  useEffect(() => {
    const controller = new AbortController();

    async function getListPost() {
      try {
        const response = await fetchListPost(auth, filter);
        console.log(response.postList)
        setListPost(response.postList);
      } catch(err) {
        console.log(err)
      }
    }

    getListPost();

    return () => {
      controller.abort();
    }

  }, [filter])

  const handlefilterLiked = (e) => {
    const btn = e.target.id;
    setFilter({
      ...filter,
      btn: btn
    })

  }

  const handlefilterFollowed = (e) => {
    const btn = e.target.id;
    setFilter({
      ...filter,
      btn: btn
    })
  }

  const handleSearch = () => {
    const text = document.getElementById("search").value;
    setFilter({
      ...filter,
      search: text,
    })
  }

  const handlereset = () => {
    const search = document.getElementById("search");
    search.value = "";
    setFilter({
      ...filter,
      search: null,
      btn: null
    })
  }


  return(
    <>
      <div className={style.filters}>
        <div className={style.searchcontainer}>
          <input id ="search" name="search" type="text" placeholder='Search a text' />
          <IoMdSearch id="search" onClick={handleSearch} className={style.searchIcon} />
        </div >
        <button id="liked" className={style.filterLiked +" "+ (filter.btn === "liked" ? style.btnActive : "") } onClick={handlefilterLiked}><img src={sheriffYellow} className={style.pngAsSvg} />Liked</button>
        <button id="following" className={style.filterFollowed +" "+(filter.btn === "following" ? style.btnActive : "") } onClick={handlefilterFollowed}><img src={handshake} className={style.icon}/>Followed</button>
        <button id="resetBtn" className={style.reset} onClick={handlereset}>RESET</button>
      </div>
      <div className={style.listpost}>
        {listPost.map(post => {
          return (
            <Post key={post.id} post={post} />
          )
        })}
      </div>
    </>
  )
}

export default Listpost