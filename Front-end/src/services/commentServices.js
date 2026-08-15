import { authFetch } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL


export const editComment = async (auth, setAuth, commentId, content) => {

    const response = await authFetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: content
        })
    }, auth, setAuth)
    
    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data.comment
}

export const deleteComment = async (auth, setAuth, commentId) => {
    const response = await authFetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }, auth, setAuth)
    
    if(!response.ok){
        throw new Error("internal server error");
    }

    const data = await response.json();

    return data
}