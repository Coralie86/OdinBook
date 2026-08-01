import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [auth, setAuth] = useState({accessToken: localStorage.getItem('accessToken')})

    // useEffect(() => {

    //     async function fetchToken() {

    //     }
    // })

    return(
        <AuthContext.Provider value={{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}