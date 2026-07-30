import { useState } from 'react'
import style from "../styles/navbar.module.css"
import navbar from "../assets/navbar.png"
import navbarvertical from "../assets/navbarvertical.png"
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import "../font/Cowboy Movie.ttf"
import { logout } from '../services/authServices'

function Navbar() {
  const page = useParams().page;
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
      localStorage.removeItem("accessToken");
      await logout();
      navigate('/');
    } catch(err) {
      console.log(err);
    }    
  }

  return(
    <div className={style.navbarContainer}>
      <div className={style.topBar} >
        <Link to='/app/newpost' className={page == "newpost" ? style.navBarButton +" "+ style.highlighted : style.navBarButton} >+ NEW NOTICE</Link>
        <Link to='/app/settings' className={page == "settings" ? style.navBarButton +" "+ style.highlighted : style.navBarButton} >SHERIFF'S OFFICE</Link>
        <Link className={style.navBarButton} onClick={handleLogout} >LEAVE TOWN</Link>
      </div>
      <div className={style.sideBar} >
        <Link to='/app/posts' className={(page == "posts" ) || (page == undefined) ? style.panelButton +" "+ style.highlighted : style.panelButton } >TOWNHALL</Link>
        <Link to='/app/users' className={page == "users" ? style.panelButton +" "+ style.highlighted : style.panelButton}>SALOON</Link>
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar