import { useContext, useEffect, useState } from 'react'
import style from "../styles/user.module.css"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"
import { acceptFollow, unFollow, requestFollow } from '../services/userServices'
import { AuthContext } from '../services/authContext'

function User({user}) {
    const [userInfo, setUserInfo] = useState(user);
    const {auth, setAuth} = useContext(AuthContext);

    let status = "toadd";
    if((user.follows).length > 0) {
        if(((user.follows)[0]).isAccepted) {
            status = "accepted";
        } else if(!((user.follows)[0]).isAccepted) {
            status = "pending";
        }
    }
    if((user.followers).length > 0) {
        if(((user.followers)[0]).isAccepted) {
            status = "accepted";
        } else if(!((user.followers)[0]).isAccepted ) {
            status = "sent";
        }
    }
    
    const handleAccept = async() => {
        
        await acceptFollow(auth, setAuth, user.id);
        setUserInfo({
            ...userInfo,
            follows: userInfo.follows.map(follow => ({
                ...follow,
                isAccepted: true
            }))
        })
        
    }

    const handleUnfollow = async() => {

        await unFollow(auth, setAuth, user.id);
        setUserInfo({
            ...userInfo,
            follows: [],
            followers: []
        })
        
    }

    const handleRequest = async() => {
        
        await requestFollow(auth, setAuth, user.id);
        setUserInfo({
            ...userInfo,
            followers: [...userInfo.followers, {isAccepted: false}]
        })
    }

    return(
        <div className={style.userContainer}>
            <div className={style.userContent}>
                <img src={userInfo.image} className={style.userImage} />
                <h1>{userInfo.username}</h1>
                {
                    ((userInfo.follows).length > 0 && !((userInfo.follows)[0]).isAccepted) ?
                    <>
                        <p className={style.userStatus}>Request to review
                            <img src={pending} className={style.icon + style.status} />
                        </p>
                        <div className={style.accRej}>
                            <button onClick={handleAccept}>ACCEPT</button>
                            <button onClick={handleUnfollow}>REJECT</button>
                        </div>
                    </>
                    : (((userInfo.follows).length > 0 && ((userInfo.follows)[0]).isAccepted) || ((userInfo.followers).length > 0 && ((userInfo.followers)[0]).isAccepted)) ?
                    <>
                        <p className={style.userStatus}>Request accepted
                            <img src={handshake} className={style.icon} />
                        </p>
                        <button onClick={handleUnfollow}>UNFOLLOW</button>
                    </>
                    : ((userInfo.followers).length > 0 && !((userInfo.followers)[0]).isAccepted) ?
                    <>
                        <p className={style.userStatus}>Request sent
                            <img src={sent} className={style.icon} />
                        </p>
                    </>
                    :
                    <>
                        <p className={style.userStatus}>Follow user
                            <img src={toadd} className={style.icon + style.status} />
                        </p>
                        <button onClick={handleRequest}>FOLLOW</button>
                    </>
                }
            </div>
        </div>
    )

    // return(
    //     <div className={style.userContainer}>
    //         <div className={style.userContent}>
    //             <img src={user.image} className={style.userImage} />
    //             <h1>{user.username}</h1>
    //             <p className={style.userStatus}>{status == "pending" ? "Request to review" 
    //                 : status == "accepted" ? "Request accepted"
    //                 : status == "toadd" ? "Follow user"
    //                 : "Request sent"
    //                 }
    //             <img src={status == "accepted" ? handshake : 
    //                 status == "pending" ? pending : 
    //                 status == "sent" ? sent : toadd 
    //             } className={style.icon + ((status == "toadd") || (status == "pending") ? style.status : "")} />
    //             </p>
    //             {status == "pending" ? 
    //                 <div className={style.accRej}>
    //                     <button onClick={handleAccept}>ACCEPT</button>
    //                     <button onClick={handleUnfollow}>REJECT</button>
    //                 </div>
    //                 : status == "accepted" ? <button onClick={handleUnfollow}>UNFOLLOW</button>
    //                 : status == "toadd" ? <button onClick={handleRequest}>FOLLOW</button>
    //                 : ""
    //             }
    //         </div>
    //     </div>
    // )
}

export default User