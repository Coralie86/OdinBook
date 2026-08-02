import { refreshToken } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL


export const editComment = async (auth, commentId, content) => {

    const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify({
            description: content
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
        throw data.errors;
    }

    return data.comment
}

export const deleteComment = async (auth, commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.accessToken}`
        }
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