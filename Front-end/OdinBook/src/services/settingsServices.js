import { refreshToken } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL


export const getUserInfo = async (auth) => {
    
    const response = await fetch(`${API_URL}/users/me`, {
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

export const updateUserInfo = async (auth, {username, email, image}) => {
    const user = {};

    if(username !== undefined){
        user.username = username;
    }

    if(email !== undefined){
        user.email = email;
    }

    if(image !== undefined){
        user.image = image;
    }
    
    const response = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(user)
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

export const updatePassword = async (auth, form) => {    
    
    const response = await fetch(`${API_URL}/users/me/password`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(Object.fromEntries(form.entries())),
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