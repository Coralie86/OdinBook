const API_URL = import.meta.env.VITE_API_URL

export const register = async (form) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    
    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data;
}

export const login = async (form) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(Object.fromEntries(form.entries())),
    });

    const data = await response.json();

    if(!response.ok){
        throw data.errors;
    }

    return data;
}

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await response.json();

    if(!response.ok){
        return data.errors
    }

    return data
}