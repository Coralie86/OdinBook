import { authFetch } from "./authServices";

const API_URL = import.meta.env.VITE_API_URL

export const createPost = async (auth, setAuth, content) => {

    const response = await authFetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            content: content,
        })
    }, auth, setAuth)

    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data
}