import { authFetch } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL


export const getUserInfo = async (auth, setAuth) => {
    
    const response = await authFetch(`${API_URL}/users/me`, {
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

export const updateUserInfo = async (auth, setAuth, {username, email, image}) => {
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
    
    const response = await authFetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }, auth, setAuth)

    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }   

    return data
}

export const updatePassword = async (auth, setAuth, form) => {    
    console.log(Object.fromEntries(form.entries()))
    const response = await authFetch(`${API_URL}/users/me/password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(form.entries())),
    }, auth, setAuth)

    const data = await response.json();

    if(!response.ok){
        throw data.errors
    }

    return data
}