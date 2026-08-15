import { authFetch } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const fetchUsersList = async (auth, setAuth, filter) => {
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

    const response = await authFetch(`${API_URL}/users?${query}`, {
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


export const acceptFollow = async (auth, setAuth, userFollowedId) => {
   
    const response = await authFetch(`${API_URL}/users/${userFollowedId}/follows`, {
        method: "PUT",
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

export const unFollow = async (auth, setAuth, userId) => {
   
    const response = await authFetch(`${API_URL}/users/${userId}/follows`, {
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

export const requestFollow = async (auth, setAuth, userFollowedId) => {
   
    const response = await authFetch(`${API_URL}/users/${userFollowedId}/follows`, {
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
