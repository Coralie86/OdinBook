import { refreshToken } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const createPost = async (auth, content) => {

    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify({
            content: content,
        })
    })

    const data = await response.json();
    
    if(response.status == 401){
        try {
            const response = await refreshToken();
            localStorage.setItem('accessToken', response.accessToken);
        } catch(err) {
            throw new Error("internal server error");
        }
    }

    if(!response.ok){
        throw new Error("internal server error");
    }

    return data
}