import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./settingsServices";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [auth, setAuth] = useState({
        accessToken: localStorage.getItem('accessToken'),
        isGuest: false,
    })

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUser() {
            try {
                if(auth.accessToken){
                    const response = await getUserInfo(auth, setAuth);
                    setAuth({
                        ...auth,
                        isGuest: response.isGuest,
                    })
                }
            } catch(err){
                console.log(err)
            }
        }

        fetchUser();

        return () => {
            controller.abort();
        }
    }, [auth.accessToken])

    return(
        <AuthContext.Provider value={{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}