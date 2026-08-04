import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [auth, setAuth] = useState({accessToken: localStorage.getItem('accessToken')})

    // useEffect(() => {
    //     const controller = new AbortController();

    //     async function fetchToken() {
    //         try {
    //             if(!auth.accessToken){
    //                 Navigate("/")
    //             }
    //         } catch(err){
    //             console.log(err)
    //         }
    //     }

    //     return () => {
    //         constroller.abort();
    //     }
    // }, [auth.accessToken])

    return(
        <AuthContext.Provider value={{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}