import { refreshToken } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const fetchUsersList = async (auth, filter) => {
    let query = "";
    if(filter.btn === "pendingBtn"){
        query = query.concat("&pending=true");

    } else if(filter.btn === "followedBtn"){
        query = query.concat("&following=true");

    } else if(filter.btn === "sentBtn"){
        query = query.concat("&requested=true");

    } 
    if(filter.search){
        query = query.concat("&search="+filter.search);
    }

    const response = await fetch(`${API_URL}/users?${query}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
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


export const acceptFollow = async (auth, userFollowedId) => {
   
    const response = await fetch(`${API_URL}/users/${userFollowedId}/follows`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
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

export const unFollow = async (auth, userId) => {
   
    const response = await fetch(`${API_URL}/users/${userId}/follows`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
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

export const requestFollow = async (auth, userFollowedId) => {
   
    const response = await fetch(`${API_URL}/users/${userFollowedId}/follows`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
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
