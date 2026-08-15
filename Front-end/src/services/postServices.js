import { authFetch } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const fetchListPost = async (auth, setAuth, filter) => {
    let query = "";
    if(filter.search){
        query = query.concat("&search="+filter.search)
    }

    if(filter.btn === "liked"){
        query = query.concat("&liked=true")
    } else if(filter.btn === "following"){
        query = query.concat("&following=true")
    }

    const response = await authFetch(`${API_URL}/posts?${query}`, {
        method: "GET",
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

export const likePost = async (auth, setAuth, postId) => {

    const response = await authFetch(`${API_URL}/posts/${postId}/likes`, {
        method: "POST",
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

export const unlikePost = async (auth, setAuth, postId) => {

    const response = await authFetch(`${API_URL}/posts/${postId}/likes`, {
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

export const addComment = async (auth, setAuth, postId, content) => {

    const response = await authFetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
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

    return data
}