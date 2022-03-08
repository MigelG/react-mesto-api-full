export const BASE_URL = 'https://api.mishukot.nomoredomains.xyz';

const headers = (token) => {
    return {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) { return res.json() }
    return Promise.reject(res);
}

export const getAppInfo = (token) => {
    return Promise.all([getUserInfo(token), getCardList(token)])
}

export const getCardList = (token) => {
    return fetch(`${BASE_URL}/cards`, {
        headers: headers(token)
    })
        .then(checkResponse);
}

export const addCard = (data, token) => {
    return fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: headers(token),
        body: JSON.stringify(data),
    })
        .then(checkResponse);
}

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        headers: headers(token)
    })
        .then(checkResponse);
}

export const saveUserInfo = (data, token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: headers(token),
        body: JSON.stringify(data),
    })
        .then(checkResponse);
}

export const deleteCard = (id, token) => {
    return fetch(`${BASE_URL}/cards/${id}`, {
        method: 'DELETE',
        headers: headers(token),
    })
        .then(checkResponse);
}

export const likeCard = (id, method, token) => {
    return fetch(`${BASE_URL}/cards/${id}/likes`, {
        method: `${method}`,
        headers: headers(token),
    })
        .then(checkResponse);
}

export const editAvatar = (avatar, token) => {
    return fetch(`${BASE_URL}/users/me/avatar`, {
        method: 'PATCH',
        headers: headers(token),
        body: JSON.stringify(avatar),
    })
        .then(checkResponse);
}
