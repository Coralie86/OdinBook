import { useContext, useEffect, useState } from 'react'
import style from "../styles/settings.module.css"
import { CiEdit } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { AuthContext } from '../services/authContext';
import { getUserInfo, updateUserInfo, updatePassword} from "../services/settingsServices.js"
import {logout} from "../services/authServices.js"
import { useNavigate } from 'react-router-dom';
import Errors from "./errors.jsx"
import Modal from './modal.jsx';

function Settings() {
  const [isEditable, setIsEditable] = useState(false);
  const {auth, setAuth} = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    profile: [],
    password: []
  });
  const [profile, setProfile] = useState({
    id: null,
    username: null,
    email: null,
    image: null,
  });
  const navigate = useNavigate();

  const textModalGuest = "You cannot perform this action as you are connected as a Guest. Register and you will be granted all actions."

  useEffect(() => {
    const controller = new AbortController();

    async function getuserProfile() {
      try {
        const response = await getUserInfo(auth, setAuth);
        
        setProfile({
          ...profile,
          email: response.email,
          username: response.username,
          image: response.image
        });
      } catch(err) {
        console.log(err)
      }
    }

    getuserProfile();
    return () => {
      controller.abort();
    }
  }, [])

  const handleSave = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    
    try {
      await updateUserInfo(auth, setAuth, {username: username, email: email});
      setIsEditable(false);

      // Force re-login
      localStorage.removeItem("accessToken");
      await logout();
      navigate('/');
      setErrors({...errors,
          password: [],
          profila: []
        })
      setSuccess(false);

    } catch(err){
      setErrors({
        ...errors,
        profile: err,
        password: []
      })
      setSuccess(false);
    }    
  }  

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if(auth.isGuest){
      setIsOpen(true);
    } else {
      try {
        await updatePassword(auth, setAuth, formData);
        setErrors({...errors,
          password: [],
          profile: []
        })
        setSuccess(true);
      } catch(err) {
        setErrors({
          ...errors,
          password: err,
          profile: []
        })
        setSuccess(false);
      }
    }
    
  }

  const handleFiledEditable = () => {
    if(auth.isGuest){
      setIsOpen(true);
    } else {
      setIsEditable(true);
    }
  }

  const handleCancel = () => {
    setIsEditable(false);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return(
    <>
    {isOpen && (
      <Modal handleCloseModal={handleCloseModal} text={textModalGuest} />
    )}
    <div className={style.settingsContainer} >
      <h1 className={style.headersProfile}>SHERIFF'S PROFILE</h1>
      <div className={style.profile}>
        <div id="imagePerso">
          <img className={style.imgProfile} src={profile.image} />
        </div>
        <div className={style.inputs}>
          {isEditable ?
          <>
            <input id="username" className={style.edited} name="username" defaultValue={profile.username} required/>
            <input id="email" className={style.edited} name="email" defaultValue={profile.email} required/>
            {errors.profile.length > 0 &&
                <Errors errors={errors.profile} />
            }
          </>
          : 
          <div className={style.usernameEmail}>
            <div >Username: {profile.username}</div>
            <div >Email: {profile.email}</div>
          </div>
          }
          
        </div>
        {!isEditable ? 
          <CiEdit onClick={handleFiledEditable} className={style.iconEdit}/>
          : 
          <div>
          <TiTickOutline onClick={handleSave} className={style.iconEdit} />
          <TiCancel onClick={handleCancel} className={style.iconEdit} />
          </div>
        }
        
      </div>
      <div className={style.passwordUpdate} >
        <h1 className={style.headersProfile}>UPDATE YOUR PASSWORD</h1>
        <form className={style.formPassword} method="put" onSubmit={handleChangePassword}>
          <input name="password" id="password" type="password" placeholder="Insert new password" required/>
          <input name="passwordConfirmation" id="passwordConfirmation" placeholder="Confirm new password" type="password" required/>
          <button className={style.submitBtn} type="submit" >UPDATE PASSWORD</button>
        </form>
        {errors.password.length > 0 &&
                <Errors errors={errors.password} />
            }
        {success ? (
          <div className={style.success}>Password successfully updated</div>
        ) : <></>}
      </div>
    </div>
    </>
  )
}

export default Settings