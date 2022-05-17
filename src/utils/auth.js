export const BASE_URL = 'http://back.kachur.nomoreparties.sbs';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                return res;
            } else {
                return;
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
}