import { refreshToken } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const fetchListPost = async (auth, filter) => {
    let query = "";
    if(filter.search){
        query = query.concat("&search="+filter.search)
    }

    if(filter.btn === "liked"){
        query = query.concat("&liked=true")
    } else if(filter.btn === "following"){
        query = query.concat("&following=true")
    }

    const response = await fetch(`${API_URL}/posts?${query}`, {
        method: "GET",
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

export const likePost = async (auth, postId) => {

    const response = await fetch(`${API_URL}/posts/${postId}/likes`, {
        method: "POST",
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

export const unlikePost = async (auth, postId) => {

    const response = await fetch(`${API_URL}/posts/${postId}/likes`, {
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

export const addComment = async (auth, postId, content) => {

    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
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
        throw new Error("internal server error");
    }

    return data
}