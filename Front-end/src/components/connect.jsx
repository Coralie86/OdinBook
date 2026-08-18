import { useContext, useState } from 'react'
import style from "../styles/connect.module.css"
import wanted from "../assets/wanted.png"
import { Link, useNavigate } from 'react-router-dom'
import {register, login, loginGuest} from "../services/authServices.js"
import { AuthContext } from '../services/authContext.jsx'
import Errors from "./errors.jsx"

function Connect() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const {auth, setAuth} = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const res = await login(formData);
            const token = res.accessToken;
            localStorage.setItem('accessToken', token);
            setAuth({...auth, accessToken: token})
            navigate("/app");
        } catch(err){
            setErrors(err);
        }

    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await register(formData);
            setSuccess(true);
            setErrors([])
        } catch(err) {
            setErrors(err);
        }
    }

    const handleAsGuest = async () => {
        try {
            const res = await loginGuest();
            const token = res.accessToken;
            localStorage.setItem('accessToken', token);
            setAuth({...auth, accessToken: token})
            navigate("/app");
        } catch(err){
            setErrors(err);
        }
    }

    return(
    <div className={style.wantedImage}>
        <div className={style.form}>
            {/* <img src={wanted} /> */}
            <div className={style.login} >
                <form className={style.formLogin} method="post" onSubmit={handleLogin}>
                    <label htmlFor="email">
                        <input className={style.input} name="email" type="email" placeholder="Email" required />
                    </label>
                    <label htmlFor="password">
                        <input className={style.input} name="password" type="password" placeholder="Password" required />
                    </label>
                    <button className={style.regBtn} type="submit">CONNECT</button>
                </form>
                <form className={style.formRegister} method="post" onSubmit={handleRegister}>
                    <label htmlFor="username">
                        <input className={style.input} name="username" type="test" placeholder="Insert a username" required />
                    </label>
                    <label htmlFor="email">
                        <input className={style.input} name="email" type="email" placeholder="Insert an Email" required />
                    </label>
                    <label htmlFor="password">
                        <input className={style.input} name="password" type="password" placeholder="Choose a password" required />
                    </label>
                    <label htmlFor="confirmPassword">
                        <input className={style.input} name="confirmPassword" type="password" placeholder="Confirm your password" required />
                    </label>
                    <button className={style.regBtn} type="submit">REGISTER</button>
                </form>
                <Link className={style.guestButton} onClick={handleAsGuest} >GUEST ACCESS</Link>            
            </div>
        </div>
        <div className={style.feedback} >
            {errors.length > 0 &&
                <Errors errors={errors} />
            }
            {success ? (
                <div className={style.success}>Registration successfull. You can now login.</div>
            ) : <></>}
        </div>
    </div>
    )
}

export default Connect