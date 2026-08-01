import { useContext, useEffect, useState } from 'react'
import style from "../styles/usersList.module.css"
import User from "./user.jsx"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"
import {AuthContext} from "../services/authContext.jsx"
import { fetchUsersList} from '../services/userServices.js'
import { IoMdSearch } from "react-icons/io";

function UserList() {
  const [users, setUsers] = useState([]);
  const {auth, setAuth} = useContext(AuthContext);
  const [filter, setFilter] = useState({
    search: null,
    btn: null
  });
  
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers () {
        try {
            const response = await fetchUsersList(auth, filter);
            setUsers(response)
        } catch(err) {
            console.log(err);
        }
    }

    fetchUsers();
    return () => {
        controller.abort();
    }

  }, [filter])

  const handlefilter = async (e) => {
    const btn = e.target;
    setFilter({
      ...filter,
      btn: btn.id
    });
  }

  const handlereset = () => {
    const btn = document.getElementById("searchBar");
    btn.value = "";
    setFilter({
      ...filter,
      btn: null,
      search: null
    })
  }

  const handleSearch = (e) => {
    const btn = document.getElementById("searchBar");
    setFilter({
      ...filter,
      search: btn.value
    });
  }

  return(
    <div className={style.filterUsers} >
      <div className={style.filters}>
        <div className={style.searchcontainer}>
          <input id="searchBar" name="search" type="text" placeholder='Search a text' />
          <IoMdSearch id="search" onClick={handleSearch} className={style.searchIcon} />
        </div >
        <button id="followedBtn" className={style.filterFollowed +" "+ (filter.btn == "followedBtn" ? style.activeBtn :"")} onClick={handlefilter}><img src={handshake} className={style.icon}/>Followed</button>
        <button id="pendingBtn" className={style.filterFollowed +" "+ (filter.btn == "pendingBtn" ? style.activeBtn :"")} onClick={handlefilter}><img src={pending} className={style.icon}/>To Review</button>
        <button id="sentBtn" className={style.filterFollowed +" "+ (filter.btn == "sentBtn" ? style.activeBtn :"")} onClick={handlefilter}><img src={sent} className={style.icon}/>Sent</button>
        <button id="resetBtn" className={style.reset} onClick={handlereset}>RESET</button>
      </div>
      <div className={style.listuser}>
        {users.map(user => {
          return (
            <User key={user.id} user={user} />
          )
        })}
      </div>
    </div>
  )
}

export default UserList