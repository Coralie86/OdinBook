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

export const refreshToken = async () => {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await response.json();

    if(!response.ok){
        return new Error("Unable to refresh token.")
    }
    return data
}

export const authFetch = async (url, options = {}, auth, setAuth) =>{
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${auth.accessToken}`,
    }

    let response = await fetch(url, {
        ...options,
        headers: headers,
        credentials: "include",
    })

    if(response.status !== 401){
        return response;
    }

    try {
        const refresh = await refreshToken();

        localStorage.setItem("token", refresh.accessToken);

        setAuth(prev => ({
            ...prev, accessToken: refresh.accessToken
        }))

        response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${refresh.accessToken}`
            },
            credentials: "include",
        });
    } catch(err) {
        localStorage.removeItem("accessToken");
        setAuth ({accessToken: null})
        logout();
        throw err;
    }
    
    return response;
}