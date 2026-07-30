import { useState } from 'react'
import style from "../styles/settings.module.css"
import { CiEdit } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";

function Settings() {
  const [isEditable, setIsEditable] = useState(false);

  const username="usernameValue";
  const email="emailValue";

  const handleFiledEditable = () => {
    setIsEditable(true);
  }

  const handleChangePassword = () => {
  }

  const handleSave = () => {
    setIsEditable(false);
  }

  const handleCancel = () => {
    setIsEditable(false);
  }

  return(
    <div className={style.settingsContainer} >
      <h1 className={style.headersProfile}>SHERIFF'S PROFILE</h1>
      <div className={style.profile}>
        <div id="imagePerso">
          <img className={style.imgProfile} src="null" />
        </div>
        <div className={style.inputs}>
          {isEditable ?
          <>
            <input className={style.edited} name="username" defaultValue={username} required/>
            <input className={style.edited} name="email" defaultValue={email} required/>
          </>
          : 
          <div className={style.usernameEmail}>
            <div >Username: {username}</div>
            <div >Email: {email}</div>
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
        <form className={style.formPassword} method="post" onSubmit={handleChangePassword}>
          <input name="password" id="password" type="password" required/>
          <input name="passwordConfirmation" id="passwordConfirmation" type="password" required/>
          <button className={style.submitBtn} type="submit" >UPDATE PASSWORD</button>
        </form>
      </div>
    </div>
  )
}

export default Settings